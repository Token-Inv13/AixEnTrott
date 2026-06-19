type TravelMode = 'BICYCLE' | 'TWO_WHEELER';

type RouteDistanceRequestBody = {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  travelMode?: TravelMode;
};

type ComputeRoute = {
  distanceMeters?: number;
  duration?: string;
  routeLabels?: string[];
  legs?: Array<{
    distanceMeters?: number;
    duration?: string;
  }>;
  polyline?: {
    encodedPolyline?: string;
  };
};

type ComputeRoutesResponse = {
  routes?: ComputeRoute[];
};

type JsonResponse = {
  ok: true;
  result: {
    distanceMeters: number;
    distanceKm: number;
    durationSeconds: number;
    durationLabel: string;
    encodedPolyline?: string;
    alternativeCount: number;
    legCount: number;
    provider: 'google-routes';
    travelMode: TravelMode;
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
const FIELD_MASK =
  'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline,routes.routeLabels,routes.legs.distanceMeters,routes.legs.duration';

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
  const travelMode = record.travelMode === 'BICYCLE' || record.travelMode === 'TWO_WHEELER'
    ? record.travelMode
    : 'TWO_WHEELER';

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

function buildRequestBody(payload: RouteDistanceRequestBody, travelMode: TravelMode) {
  return {
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
    travelMode,
    computeAlternativeRoutes: true,
    units: 'METRIC',
    languageCode: 'fr-FR',
    polylineQuality: 'OVERVIEW',
  };
}

async function requestRoutes(payload: RouteDistanceRequestBody, apiKey: string, travelMode: TravelMode) {
  const response = await fetch(ROUTES_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
    body: JSON.stringify(buildRequestBody(payload, travelMode)),
  });

  const data = (await response.json()) as ComputeRoutesResponse | { error?: { message?: string } };
  const routes = 'routes' in data ? data.routes ?? [] : [];
  const route = routes[0];

  return {
    response,
    data,
    routes,
    route,
  };
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

  const modesToTry: TravelMode[] = payload.travelMode === 'BICYCLE' ? ['BICYCLE'] : ['TWO_WHEELER', 'BICYCLE'];
  let lastAttempt: Awaited<ReturnType<typeof requestRoutes>> | null = null;
  let effectiveTravelMode: TravelMode = modesToTry[0];

  for (const travelMode of modesToTry) {
    const attempt = await requestRoutes(payload, apiKey, travelMode);
    lastAttempt = attempt;

    if (attempt.response.ok && attempt.route?.distanceMeters != null && attempt.route.duration) {
      effectiveTravelMode = travelMode;
      break;
    }
  }

  if (!lastAttempt || !lastAttempt.response.ok || lastAttempt.route?.distanceMeters == null || !lastAttempt.route.duration) {
    res.status(lastAttempt?.response.status && lastAttempt.response.status >= 400 ? lastAttempt.response.status : 502).json({
      ok: false,
      error:
        lastAttempt &&
        'error' in lastAttempt.data &&
        lastAttempt.data.error?.message
          ? lastAttempt.data.error.message
          : 'Google Routes API request failed',
    });
    return;
  }

  const durationSeconds = parseDurationToSeconds(lastAttempt.route.duration);
  const distanceMeters = lastAttempt.route.distanceMeters;
  const result = {
    distanceMeters,
    distanceKm: Number((distanceMeters / 1000).toFixed(1)),
    durationSeconds,
    durationLabel: formatDurationLabel(durationSeconds),
    encodedPolyline: lastAttempt.route.polyline?.encodedPolyline,
    alternativeCount: Math.max(0, lastAttempt.routes.length - 1),
    legCount: lastAttempt.route.legs?.length ?? 1,
    provider: 'google-routes' as const,
    travelMode: effectiveTravelMode,
    isEstimated: false as const,
  };

  res.status(200).json({ ok: true, result });
}
