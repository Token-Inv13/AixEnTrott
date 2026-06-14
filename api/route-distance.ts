type RouteDistanceRequestBody = {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  travelMode?: 'BICYCLE';
};

type ComputeRoutesResponse = {
  routes?: Array<{
    distanceMeters?: number;
    duration?: string;
    polyline?: {
      encodedPolyline?: string;
    };
  }>;
};

type JsonResponse = {
  ok: true;
  result: {
    distanceMeters: number;
    distanceKm: number;
    durationSeconds: number;
    durationLabel: string;
    encodedPolyline?: string;
    provider: 'google-routes';
    travelMode: 'BICYCLE';
    isEstimated: false;
  };
} | {
  ok: false;
  error: string;
};

type VercelLikeResponse = {
  status(code: number): VercelLikeResponse;
  json(payload: JsonResponse): void;
  setHeader(name: string, value: string): VercelLikeResponse;
  end(body?: string): void;
};

type VercelLikeRequest = {
  method?: string;
  body?: unknown;
};

const ROUTES_API_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const FIELD_MASK = 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline';

function parseDurationToSeconds(duration: string | undefined) {
  if (!duration) {
    return 0;
  }

  const match = duration.match(/^(\d+(?:\.\d+)?)s$/);
  if (!match) {
    return 0;
  }

  return Math.max(0, Math.round(Number(match[1])));
}

function formatDurationLabel(seconds: number) {
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
}

function toNumber(value: unknown) {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed) ? parsed : null;
}

function normalizeBody(body: unknown): RouteDistanceRequestBody | null {
  const source = typeof body === 'string' ? (() => {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return null;
    }
  })() : body;

  if (!source || typeof source !== 'object') {
    return null;
  }

  const record = source as Record<string, unknown>;
  const originLat = toNumber(record.originLat);
  const originLng = toNumber(record.originLng);
  const destinationLat = toNumber(record.destinationLat);
  const destinationLng = toNumber(record.destinationLng);
  const travelMode = record.travelMode === 'BICYCLE' ? 'BICYCLE' : 'BICYCLE';

  if (originLat == null || originLng == null || destinationLat == null || destinationLng == null) {
    return null;
  }

  return {
    originLat,
    originLng,
    destinationLat,
    destinationLng,
    travelMode,
  };
}

function getApiKey() {
  return (
    process.env.GOOGLE_MAPS_ROUTES_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_SERVER_API_KEY?.trim() ||
    ''
  );
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    res.status(500).json({ ok: false, error: 'Google Routes API key missing' });
    return;
  }

  const payload = normalizeBody(req.body);
  if (!payload) {
    res.status(400).json({ ok: false, error: 'Invalid request body' });
    return;
  }

  const body = {
    origin: {
      location: {
        latLng: {
          latitude: payload.originLat,
          longitude: payload.originLng,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: payload.destinationLat,
          longitude: payload.destinationLng,
        },
      },
    },
    travelMode: payload.travelMode ?? 'BICYCLE',
    computeAlternativeRoutes: false,
    units: 'METRIC',
  };

  const response = await fetch(ROUTES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as ComputeRoutesResponse | { error?: { message?: string } };
  const route = 'routes' in data ? data.routes?.[0] : undefined;

  if (!response.ok || route?.distanceMeters == null || !route.duration) {
    res.status(response.status >= 400 ? response.status : 502).json({
      ok: false,
      error: 'error' in data && data.error?.message ? data.error.message : 'Google Routes API request failed',
    });
    return;
  }

  const durationSeconds = parseDurationToSeconds(route.duration);
  const distanceMeters = route.distanceMeters;
  const result = {
    distanceMeters,
    distanceKm: Number((distanceMeters / 1000).toFixed(1)),
    durationSeconds,
    durationLabel: formatDurationLabel(durationSeconds),
    encodedPolyline: route.polyline?.encodedPolyline,
    provider: 'google-routes' as const,
    travelMode: 'BICYCLE' as const,
    isEstimated: false as const,
  };

  res.status(200).json({ ok: true, result });
}
