import type { Spot } from '../data/spots';
import { getDefaultOrigin, hasGoogleMapsPublicApiKey } from './google-maps-config';
import { formatDurationLabel, type RouteDistanceDisplay, type RouteDistanceResult } from './route-distance-types';

type CacheEntry = {
  expiresAt: number;
  value: RouteDistanceDisplay;
};

const CACHE_KEY = 'trott-out-aix-route-distance-v1';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getCache(): Record<string, CacheEntry> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, CacheEntry>;
    const now = Date.now();
    return Object.fromEntries(Object.entries(parsed).filter(([, entry]) => entry.expiresAt > now));
  } catch {
    return {};
  }
}

function setCache(cache: Record<string, CacheEntry>) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage quota or private mode errors.
  }
}

function buildCacheKey(params: RouteDistanceRequest) {
  return [
    params.originLat.toFixed(5),
    params.originLng.toFixed(5),
    params.destinationLat.toFixed(5),
    params.destinationLng.toFixed(5),
    params.travelMode,
  ].join(':');
}

export type RouteDistanceRequest = {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  travelMode?: 'BICYCLE';
};

export function createIndicativeRouteDistance(distanceKm: number): RouteDistanceDisplay {
  const durationSeconds = Math.max(60, Math.round(distanceKm * 4 * 60));
  return {
    provider: 'google-routes',
    source: 'indicative',
    distanceKm,
    durationSeconds,
    durationLabel: formatDurationLabel(durationSeconds),
    label: 'Distance indicative',
    isEstimated: true,
  };
}

export async function resolveRouteDistance(request: RouteDistanceRequest, fallbackDistanceKm: number) {
  const requestKey = buildCacheKey(request);
  const cache = getCache();
  const cached = cache[requestKey];
  if (cached) {
    return cached.value;
  }

  if (!hasGoogleMapsPublicApiKey()) {
    return createIndicativeRouteDistance(fallbackDistanceKm);
  }

  try {
    const response = await fetch('/api/route-distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originLat: request.originLat,
        originLng: request.originLng,
        destinationLat: request.destinationLat,
        destinationLng: request.destinationLng,
        travelMode: request.travelMode ?? 'BICYCLE',
      }),
    });

    const payload = (await response.json()) as
      | { ok: true; result: RouteDistanceResult }
      | { ok: false; error: string };

    if (!response.ok || !payload.ok) {
      return createIndicativeRouteDistance(fallbackDistanceKm);
    }

    const value: RouteDistanceDisplay = {
      provider: payload.result.provider,
      source: 'google-routes',
      distanceKm: payload.result.distanceKm,
      durationSeconds: payload.result.durationSeconds,
      durationLabel: payload.result.durationLabel,
      encodedPolyline: payload.result.encodedPolyline,
      label: 'Distance calculée',
      isEstimated: false,
    };

    cache[requestKey] = {
      expiresAt: Date.now() + CACHE_TTL_MS,
      value,
    };
    setCache(cache);
    return value;
  } catch {
    return createIndicativeRouteDistance(fallbackDistanceKm);
  }
}

export async function resolveRouteDistanceForSpot(spot: Spot, fallbackDistanceKm = spot.distanceKmFromAix) {
  const origin = getDefaultOrigin();
  return resolveRouteDistance(
    {
      originLat: origin.lat,
      originLng: origin.lng,
      destinationLat: spot.latitude,
      destinationLng: spot.longitude,
      travelMode: 'BICYCLE',
    },
    fallbackDistanceKm,
  );
}

export function getRouteDistanceDisplay(distance: RouteDistanceDisplay | null | undefined, fallbackDistanceKm: number) {
  if (!distance) {
    return {
      label: 'Distance indicative' as const,
      distanceKm: fallbackDistanceKm,
      durationLabel: undefined as string | undefined,
      source: 'indicative' as const,
      isEstimated: true,
    };
  }

  return distance;
}
