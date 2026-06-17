import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CircleMarker, MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';
import {
  destinationShortLabel,
  categoryLabel,
  formatBudget,
  formatCompatibility,
  formatDifficulty,
  formatRechargeStatus,
  formatRouteType,
} from '../lib/spot-utils';
import { buildGoogleMapsDirectionsUrl } from '../lib/google-maps-config';
import { decodePolyline } from '../lib/polyline';
import { formatRouteDistanceLabel, type RouteDistanceDisplay } from '../lib/route-distance-types';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { getDefaultRouteOrigin, type RouteOrigin } from '../lib/user-location';

function makeIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 9999px;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.18);
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

function FitBounds({ points }: { points: LatLngExpression[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 1) {
      map.setView(points[0], 13);
      return;
    }
    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points as [number, number][]), { padding: [36, 36] });
    }
  }, [map, points]);
  return null;
}

export function MapView({
  spots,
  chargingPoints,
  showSpots = true,
  showCharging = true,
  origin = getDefaultRouteOrigin(),
  routePolyline,
  routeDistanceBySpotId = {},
  height = 'h-[26rem]',
}: {
  spots: Spot[];
  chargingPoints: ChargingPoint[];
  showSpots?: boolean;
  showCharging?: boolean;
  origin?: RouteOrigin;
  routePolyline?: string | null;
  routeDistanceBySpotId?: Record<string, RouteDistanceDisplay | undefined>;
  height?: string;
}) {
  const points = useMemo(() => {
    const coords: LatLngExpression[] = [];
    if (showSpots) {
      spots.forEach((spot) => coords.push([spot.latitude, spot.longitude]));
    }
    if (showCharging) {
      chargingPoints.forEach((point) => coords.push([point.latitude, point.longitude]));
    }
    coords.push([origin.latitude, origin.longitude]);
    return coords.length ? coords : ([[43.5297, 5.4474]] as LatLngExpression[]);
  }, [spots, chargingPoints, showSpots, showCharging, origin.latitude, origin.longitude]);

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft ${height}`}>
      <MapContainer center={[43.5297, 5.4474]} zoom={10} className="h-full w-full" scrollWheelZoom={false}>
        <FitBounds points={points} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routePolyline ? (
          <Polyline
            positions={decodePolyline(routePolyline).map((point) => [point.lat, point.lng])}
            pathOptions={{ color: '#0f172a', weight: 4, opacity: 0.85 }}
          />
        ) : null}
        <Marker
          position={[origin.latitude, origin.longitude]}
          icon={makeIcon(origin.source === 'user-location' ? '#111827' : '#94a3b8')}
          title={origin.source === 'user-location' ? 'Ma position' : origin.label}
        />
        {showSpots
          ? spots.map((spot) => (
              <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={makeIcon('#2563eb')}>
                <Popup>
                  <div className="max-w-[15rem]">
                    <h3 className="text-sm font-semibold text-slate-950">{spot.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">Type: Sortie</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {routeDistanceBySpotId[spot.id]
                        ? formatRouteDistanceLabel(routeDistanceBySpotId[spot.id]!)
                        : 'Distance indicative depuis Aix-en-Provence'}
                      : {(routeDistanceBySpotId[spot.id]?.distanceKm ?? spot.distanceKmFromAix).toFixed(1)} km
                    </p>
                    {routeDistanceBySpotId[spot.id]?.durationLabel ? (
                      <p className="mt-1 text-xs text-slate-500">
                        Durée vélo estimée: {routeDistanceBySpotId[spot.id]?.durationLabel}
                      </p>
                    ) : null}
                    <p className="mt-1 text-xs text-slate-500">Budget: {formatBudget(spot.budget)}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Statut recharge: {formatRechargeStatus(spot.rechargeStatus)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Type: {categoryLabel(spot.category)}</p>
                    <p className="mt-1 text-xs text-slate-500">Adresse: {destinationShortLabel(spot.address)}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Difficulté: {formatDifficulty(spot.difficulty)} · {formatRouteType(spot.routeType).toLowerCase()}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Pistes: {spot.cyclingInfrastructure.label}</p>
                    <p className="mt-2 text-[11px] leading-5 text-slate-400">
                      Les itinéraires vélo Google Maps sont indicatifs et peuvent ne pas refléter toutes les pistes
                      cyclables ou zones adaptées aux trottinettes.
                    </p>
                    <a
                      className="mt-3 inline-flex text-xs font-semibold text-sky"
                      href={buildGoogleMapsBikeDirectionsUrl(spot.latitude, spot.longitude)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Itinéraire vélo
                    </a>
                    <div className="mt-2 flex flex-col gap-1">
                      <Link className="inline-flex text-xs font-semibold text-sky" to={`/sorties/${spot.id}`}>
                        Voir la fiche
                      </Link>
                      <a
                        className="inline-flex text-xs font-semibold text-sky"
                        href={buildGoogleMapsDirectionsUrl(spot.latitude, spot.longitude)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ouvrir destination
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
          : null}
        {showCharging
          ? chargingPoints.map((point) => (
              <Marker key={point.id} position={[point.latitude, point.longitude]} icon={makeIcon('#0f766e')}>
                <Popup>
                  <div className="max-w-[13rem]">
                    <h3 className="text-sm font-semibold text-slate-950">{point.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">Type: Recharge</p>
                    <p className="mt-1 text-xs text-slate-500">Statut recharge: {formatCompatibility(point.compatibility)}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {point.city} · {point.address}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))
          : null}
        <CircleMarker
          center={[origin.latitude, origin.longitude]}
          radius={28}
          pathOptions={{ color: '#94a3b8', fillColor: '#e2e8f0', fillOpacity: 0.3 }}
        />
      </MapContainer>
    </div>
  );
}
