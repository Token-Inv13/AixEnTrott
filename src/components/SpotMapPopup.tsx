import { Link } from 'react-router-dom';
import type { Spot } from '../data/spots';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { formatRouteDistanceLabel, type RouteDistanceDisplay } from '../lib/route-distance-types';
import type { RouteOrigin } from '../lib/user-location';
import {
  areaLabel,
  destinationShortLabel,
  formatDifficulty,
  formatRechargeStatus,
  formatRouteType,
} from '../lib/spot-utils';

export function SpotMapPopup({
  spot,
  origin,
  originLabel,
  directDistanceKm,
  routeDistance,
}: {
  spot: Spot;
  origin: RouteOrigin;
  originLabel: string;
  directDistanceKm: number;
  routeDistance?: RouteDistanceDisplay | null;
}) {
  const routeDistanceLabel = routeDistance ? formatRouteDistanceLabel(routeDistance) : null;

  return (
    <div className="max-w-[16rem]">
      <h3 className="text-sm font-semibold text-slate-950">{spot.name}</h3>
      <p className="mt-1 text-xs text-slate-500">
        {areaLabel(spot.area)} · {destinationShortLabel(spot.address)}
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Distance directe indicative depuis {originLabel}: {directDistanceKm.toFixed(1)} km
      </p>
      {routeDistance ? (
        <p className="mt-1 text-xs text-slate-500">
          {routeDistanceLabel ?? 'Distance calculée'} : {routeDistance.distanceKm.toFixed(1)} km
        </p>
      ) : null}
      {routeDistance?.durationLabel ? <p className="mt-1 text-xs text-slate-500">Durée vélo estimée : {routeDistance.durationLabel}</p> : null}
      <p className="mt-1 text-xs text-slate-500">Difficulté : {formatDifficulty(spot.difficulty)}</p>
      <p className="mt-1 text-xs text-slate-500">Type de route : {formatRouteType(spot.routeType)}</p>
      <p className="mt-1 text-xs text-slate-500">Statut recharge : {formatRechargeStatus(spot.rechargeStatus)}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link className="inline-flex rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white" to={`/sorties/${spot.id}`}>
          Voir la fiche
        </Link>
        <a
          className="inline-flex rounded-full bg-sky px-3 py-1.5 text-xs font-semibold text-white"
          href={buildGoogleMapsBikeDirectionsUrl(spot.latitude, spot.longitude, origin)}
          target="_blank"
          rel="noreferrer"
        >
          Itinéraire vélo
        </a>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-400">
        Trajet réel à vérifier avant de partir.
      </p>
    </div>
  );
}
