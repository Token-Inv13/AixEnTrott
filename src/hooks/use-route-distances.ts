import { useEffect, useMemo, useState } from 'react';
import type { Spot } from '../data/spots';
import { resolveRouteDistanceForSpot } from '../lib/route-distance-client';
import type { RouteDistanceDisplay } from '../lib/route-distance-types';
import type { RouteOrigin } from '../lib/user-location';

type RouteDistanceMap = Record<string, RouteDistanceDisplay>;

export function useRouteDistances(spots: Spot[], origin: RouteOrigin) {
  const keys = useMemo(
    () => `${origin.source}|${origin.latitude}|${origin.longitude}|${spots.map((spot) => spot.id).join('|')}`,
    [origin.source, origin.latitude, origin.longitude, spots],
  );
  const [routeDistances, setRouteDistances] = useState<RouteDistanceMap>({});

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const pairs = await Promise.all(
        spots.map(async (spot) => [spot.id, await resolveRouteDistanceForSpot(spot, origin)] as const),
      );

      if (cancelled) {
        return;
      }

      setRouteDistances(Object.fromEntries(pairs));
    }

    if (spots.length) {
      run();
    } else {
      setRouteDistances({});
    }

    return () => {
      cancelled = true;
    };
  }, [keys, origin, spots]);

  return routeDistances;
}

export function useRouteDistance(spot?: Spot | null, origin?: RouteOrigin) {
  const [routeDistance, setRouteDistance] = useState<RouteDistanceDisplay | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!spot) {
        setRouteDistance(null);
        return;
      }

      const result = await resolveRouteDistanceForSpot(spot, origin);
      if (!cancelled) {
        setRouteDistance(result);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [spot?.id, origin?.source, origin?.latitude, origin?.longitude]);

  return routeDistance;
}
