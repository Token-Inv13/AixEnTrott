import type { Spot } from '../data/spots';
import type { RouteOrigin } from './user-location';

const EARTH_RADIUS_KM = 6371;

export type NearbySpot = {
  spot: Spot;
  directDistanceKm: number;
};

export function haversineKm(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const deltaLat = toRad(toLat - fromLat);
  const deltaLng = toRad(toLng - fromLng);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRad(fromLat)) * Math.cos(toRad(toLat)) * Math.sin(deltaLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

export function getNearbySpots(spots: Spot[], origin: RouteOrigin, limit = 8): NearbySpot[] {
  return spots
    .map((spot) => ({
      spot,
      directDistanceKm: haversineKm(origin.latitude, origin.longitude, spot.latitude, spot.longitude),
    }))
    .sort((a, b) => a.directDistanceKm - b.directDistanceKm || a.spot.distanceKmFromAix - b.spot.distanceKmFromAix)
    .slice(0, limit);
}

export function formatNearbyOriginLabel(origin: RouteOrigin) {
  return origin.source === 'user-location' ? 'votre position' : 'Aix-en-Provence';
}
