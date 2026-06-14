import { useEffect, useMemo, useState } from 'react';
import type { Spot } from '../data/spots';
import { resolveRouteDistanceForSpot } from '../lib/route-distance-client';
import type { RouteDistanceDisplay } from '../lib/route-distance-types';

type RouteDistanceMap = Record<string, RouteDistanceDisplay>;

export function useRouteDistances(spots: Spot[]) {
  const keys = useMemo(() => spots.map((spot) => spot.id).join('|'), [spots]);
  const [routeDistances, setRouteDistances] = useState<RouteDistanceMap>({});

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const pairs = await Promise.all(
        spots.map(async (spot) => [spot.id, await resolveRouteDistanceForSpot(spot)] as const),
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
  }, [keys]);

  return routeDistances;
}

export function useRouteDistance(spot?: Spot | null) {
  const [routeDistance, setRouteDistance] = useState<RouteDistanceDisplay | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!spot) {
        setRouteDistance(null);
        return;
      }

      const result = await resolveRouteDistanceForSpot(spot);
      if (!cancelled) {
        setRouteDistance(result);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [spot?.id]);

  return routeDistance;
}
