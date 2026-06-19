export type RouteOriginSource = 'default-aix' | 'user-location' | 'custom-search';

export type RouteOrigin = {
  label: string;
  latitude: number;
  longitude: number;
  source: RouteOriginSource;
};

export const DEFAULT_ROUTE_ORIGIN: RouteOrigin = {
  label: 'Aix-en-Provence',
  latitude: 43.529742,
  longitude: 5.447427,
  source: 'default-aix',
};

const ROUTE_ORIGIN_STORAGE_KEY = 'trott-out-aix-route-origin-v1';

export function getDefaultRouteOrigin(): RouteOrigin {
  return DEFAULT_ROUTE_ORIGIN;
}

export function getOriginFromLabel(origin: RouteOrigin) {
  return origin.source === 'user-location' ? 'votre position' : origin.label;
}

export function getOriginSourceLabel(origin: RouteOrigin) {
  switch (origin.source) {
    case 'user-location':
      return 'Ma position actuelle';
    case 'custom-search':
      return 'Depart personnalise';
    default:
      return 'Aix-en-Provence';
  }
}

export function createCustomRouteOrigin(label: string, latitude: number, longitude: number): RouteOrigin {
  return {
    label,
    latitude,
    longitude,
    source: 'custom-search',
  };
}

export function readStoredRouteOrigin(): RouteOrigin | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(ROUTE_ORIGIN_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<RouteOrigin>;
    if (
      typeof parsed.label !== 'string' ||
      typeof parsed.latitude !== 'number' ||
      typeof parsed.longitude !== 'number' ||
      (parsed.source !== 'default-aix' && parsed.source !== 'user-location' && parsed.source !== 'custom-search')
    ) {
      return null;
    }

    return {
      label: parsed.label,
      latitude: parsed.latitude,
      longitude: parsed.longitude,
      source: parsed.source,
    };
  } catch {
    return null;
  }
}

export function storeRouteOrigin(origin: RouteOrigin) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(ROUTE_ORIGIN_STORAGE_KEY, JSON.stringify(origin));
  } catch {
    // Ignore storage errors in private mode or restricted environments.
  }
}

export function clearStoredRouteOrigin() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.removeItem(ROUTE_ORIGIN_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function requestBrowserLocation(): Promise<RouteOrigin> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error("La geolocalisation n'est pas disponible sur ce navigateur."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          label: 'Ma position',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          source: 'user-location',
        });
      },
      (error) => {
        if (error.code === 1) {
          reject(new Error('Localisation refusee.'));
          return;
        }
        if (error.code === 2) {
          reject(new Error('Position indisponible.'));
          return;
        }
        if (error.code === 3) {
          reject(new Error('Delai de localisation depasse.'));
          return;
        }
        reject(new Error('Impossible de recuperer la position.'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60_000,
      },
    );
  });
}
