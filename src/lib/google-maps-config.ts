import { getDefaultRouteOrigin } from './user-location';

export type DefaultOrigin = {
  lat: number;
  lng: number;
  label: string;
};

export function getGoogleMapsPublicApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_PUBLIC_API_KEY?.trim() ?? '';
}

export function hasGoogleMapsPublicApiKey() {
  return Boolean(getGoogleMapsPublicApiKey());
}

export function getDefaultOrigin(): DefaultOrigin {
  const fallback = getDefaultRouteOrigin();
  const lat = Number(import.meta.env.VITE_DEFAULT_ORIGIN_LAT ?? String(fallback.latitude));
  const lng = Number(import.meta.env.VITE_DEFAULT_ORIGIN_LNG ?? String(fallback.longitude));
  const label = import.meta.env.VITE_DEFAULT_ORIGIN_LABEL?.trim() || fallback.label;
  return {
    lat: Number.isFinite(lat) ? lat : 43.529742,
    lng: Number.isFinite(lng) ? lng : 5.447427,
    label,
  };
}

export function buildGoogleMapsDirectionsUrl(destinationLat: number, destinationLng: number) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('travelmode', 'bicycling');
  url.searchParams.set('destination', `${destinationLat},${destinationLng}`);
  return url.toString();
}
