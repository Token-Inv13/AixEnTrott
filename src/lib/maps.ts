import type { RouteOrigin } from './user-location';

export function buildGoogleMapsSearchUrl(latitude: number, longitude: number) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}

export function buildGoogleMapsBikeDirectionsUrl(latitude: number, longitude: number, origin?: RouteOrigin) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('destination', `${latitude},${longitude}`);
  url.searchParams.set('travelmode', 'bicycling');
  if (origin) {
    url.searchParams.set('origin', `${origin.latitude},${origin.longitude}`);
  }
  return url.toString();
}
