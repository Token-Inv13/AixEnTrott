import { getOriginFromLabel, type RouteOrigin } from './user-location';

export type RouteDistanceResult = {
  distanceMeters: number;
  distanceKm: number;
  durationSeconds: number;
  durationLabel: string;
  encodedPolyline?: string;
  alternativeCount: number;
  legCount: number;
  provider: 'google-routes';
  travelMode: 'BICYCLE' | 'TWO_WHEELER';
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
  alternativeCount: number;
  legCount: number;
  label: 'Distance calculee' | 'Distance indicative';
  travelMode?: 'BICYCLE' | 'TWO_WHEELER';
  isEstimated: boolean;
};

export function formatRouteDistanceLabel(distance: RouteDistanceDisplay) {
  const originLabel = getOriginFromLabel(distance.origin);
  if (distance.source === 'indicative') {
    return `Distance indicative depuis ${originLabel}`;
  }

  return `Distance calculee depuis ${originLabel}`;
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

export function getBicycleRouteWarning() {
  return "Les trajets Google pour velo ou deux-roues restent indicatifs. Google signale que certains amenagements, restrictions ou portions cyclables peuvent manquer: verifiez toujours sur place.";
}

export function formatAlternativeRoutesLabel(distance: Pick<RouteDistanceDisplay, 'alternativeCount'>) {
  if (!distance.alternativeCount) {
    return 'Itineraire principal Google';
  }

  return `${distance.alternativeCount + 1} itineraires Google disponibles`;
}
