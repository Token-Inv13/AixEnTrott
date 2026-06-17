import type { RouteOrigin } from './user-location';

export type RouteDistanceResult = {
  distanceMeters: number;
  distanceKm: number;
  durationSeconds: number;
  durationLabel: string;
  encodedPolyline?: string;
  provider: 'google-routes';
  travelMode: 'BICYCLE';
  isEstimated: false;
};

export type RouteDistanceDisplay = {
  origin: RouteOrigin;
  provider: 'google-routes';
  source: 'google-routes' | 'indicative';
  distanceKm: number;
  durationSeconds: number;
  durationLabel: string;
  encodedPolyline?: string;
  label: 'Distance calculée' | 'Distance indicative';
  isEstimated: boolean;
};

export function formatRouteDistanceLabel(distance: RouteDistanceDisplay) {
  if (distance.source === 'indicative') {
    return 'Distance indicative depuis Aix-en-Provence';
  }

  return distance.origin.source === 'user-location'
    ? 'Distance calculée depuis votre position'
    : 'Distance calculée depuis Aix-en-Provence';
}

export function formatDurationLabel(seconds: number) {
  const totalMinutes = Math.max(1, Math.round(seconds / 60));
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours} h ${minutes} min` : `${hours} h`;
}
