import { useEffect, useMemo, useState } from 'react';
import { APIProvider, InfoWindow, Map, Marker, Polyline } from '@vis.gl/react-google-maps';
import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';
import { buildGoogleMapsDirectionsUrl, getGoogleMapsPublicApiKey, hasGoogleMapsPublicApiKey } from '../lib/google-maps-config';
import { decodePolyline } from '../lib/polyline';
import { formatRouteDistanceLabel, type RouteDistanceDisplay } from '../lib/route-distance-types';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { getDefaultRouteOrigin, type RouteOrigin } from '../lib/user-location';
import {
  destinationShortLabel,
  formatBudget,
  formatCompatibility,
  formatDifficulty,
  formatRechargeStatus,
} from '../lib/spot-utils';

function buildMarkerIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
      <path d="M18 35s10-9.5 10-19A10 10 0 1 0 8 16c0 9.5 10 19 10 19Z" fill="${color}"/>
      <circle cx="18" cy="16" r="4.2" fill="white" opacity="0.95"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getDefaultBounds(spots: Spot[], chargingPoints: ChargingPoint[], origin: RouteOrigin) {
  const coords = [
    ...spots.map((spot) => ({ lat: spot.latitude, lng: spot.longitude })),
    ...chargingPoints.map((point) => ({ lat: point.latitude, lng: point.longitude })),
    { lat: origin.latitude, lng: origin.longitude },
  ];

  const lats = coords.map((coord) => coord.lat);
  const lngs = coords.map((coord) => coord.lng);
  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
    padding: 48,
  };
}

export function GoogleMapView({
  spots,
  chargingPoints,
  selectedSpotId,
  origin = getDefaultRouteOrigin(),
  routePolyline,
  routeDistanceBySpotId = {},
  height = 'h-[26rem]',
  onSelectSpot,
}: {
  spots: Spot[];
  chargingPoints: ChargingPoint[];
  selectedSpotId?: string | null;
  origin?: RouteOrigin;
  routePolyline?: string | null;
  routeDistanceBySpotId?: Record<string, RouteDistanceDisplay | undefined>;
  height?: string;
  onSelectSpot?: (spotId: string | null) => void;
}) {
  const apiKey = getGoogleMapsPublicApiKey();
  const selectedSpot = spots.find((spot) => spot.id === selectedSpotId) ?? null;
  const selectedRouteDistance = selectedSpot ? routeDistanceBySpotId[selectedSpot.id] : undefined;
  const defaultBounds = useMemo(() => getDefaultBounds(spots, chargingPoints, origin), [spots, chargingPoints, origin]);
  const [activeId, setActiveId] = useState<string | null>(selectedSpotId ?? null);

  useEffect(() => {
    setActiveId(selectedSpotId ?? null);
  }, [selectedSpotId]);

  if (!apiKey) {
    return null;
  }

  const encodedPath = routePolyline ? decodePolyline(routePolyline).map((point) => ({ lat: point.lat, lng: point.lng })) : null;

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft ${height}`}>
      <APIProvider apiKey={apiKey}>
        <Map defaultBounds={defaultBounds} defaultZoom={10} gestureHandling="greedy" disableDefaultUI>
          {encodedPath ? <Polyline encodedPath={routePolyline ?? ''} strokeColor="#0f172a" strokeWeight={4} strokeOpacity={0.9} /> : null}

          <Marker
            position={{ lat: origin.latitude, lng: origin.longitude }}
            icon={buildMarkerIcon(origin.source === 'user-location' ? '#111827' : '#94a3b8')}
            title={origin.source === 'user-location' ? 'Ma position' : origin.label}
          />

          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              icon={buildMarkerIcon('#2563eb')}
              title={spot.name}
              onClick={() => {
                setActiveId(spot.id);
                onSelectSpot?.(spot.id);
              }}
            />
          ))}

          {chargingPoints.map((point) => (
            <Marker
              key={point.id}
              position={{ lat: point.latitude, lng: point.longitude }}
              icon={buildMarkerIcon('#0f766e')}
              title={point.name}
              onClick={() => {
                setActiveId(point.id);
                onSelectSpot?.(null);
              }}
            />
          ))}

          {selectedSpot && activeId === selectedSpot.id ? (
            <InfoWindow position={{ lat: selectedSpot.latitude, lng: selectedSpot.longitude }} onCloseClick={() => setActiveId(null)}>
              <div className="max-w-[16rem]">
                <h3 className="text-sm font-semibold text-slate-950">{selectedSpot.name}</h3>
                <p className="mt-1 text-xs text-slate-500">Type: Sortie</p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedRouteDistance ? formatRouteDistanceLabel(selectedRouteDistance) : 'Distance indicative depuis Aix-en-Provence'}:{' '}
                  {(selectedRouteDistance?.distanceKm ?? selectedSpot.distanceKmFromAix).toFixed(1)} km
                </p>
                {selectedRouteDistance?.durationLabel ? (
                  <p className="mt-1 text-xs text-slate-500">Durée vélo estimée: {selectedRouteDistance.durationLabel}</p>
                ) : null}
                <p className="mt-1 text-xs text-slate-500">Budget: {formatBudget(selectedSpot.budget)}</p>
                <p className="mt-1 text-xs text-slate-500">Statut recharge: {formatRechargeStatus(selectedSpot.rechargeStatus)}</p>
                <p className="mt-1 text-xs text-slate-500">Difficulté: {formatDifficulty(selectedSpot.difficulty)}</p>
                <p className="mt-1 text-xs text-slate-500">{selectedSpot.address}</p>
                <p className="mt-1 text-xs text-slate-500">{destinationShortLabel(selectedSpot.address)}</p>
                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  Les itinéraires vélo Google Maps sont indicatifs et peuvent ne pas refléter toutes les pistes cyclables ou zones adaptées aux trottinettes.
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  <a href={buildGoogleMapsDirectionsUrl(selectedSpot.latitude, selectedSpot.longitude)} target="_blank" rel="noreferrer" className="text-xs font-semibold text-sky">
                    Ouvrir destination
                  </a>
                  <a href={buildGoogleMapsBikeDirectionsUrl(selectedSpot.latitude, selectedSpot.longitude)} target="_blank" rel="noreferrer" className="text-xs font-semibold text-sky">
                    Itinéraire vélo Google Maps
                  </a>
                </div>
              </div>
            </InfoWindow>
          ) : null}

          {activeId && chargingPoints.some((point) => point.id === activeId) ? (
            <InfoWindow
              position={{
                lat: chargingPoints.find((point) => point.id === activeId)?.latitude ?? origin.latitude,
                lng: chargingPoints.find((point) => point.id === activeId)?.longitude ?? origin.longitude,
              }}
              onCloseClick={() => setActiveId(null)}
            >
              <div className="max-w-[14rem]">
                <h3 className="text-sm font-semibold text-slate-950">{chargingPoints.find((point) => point.id === activeId)?.name}</h3>
                <p className="mt-1 text-xs text-slate-500">Type: Recharge</p>
                <p className="mt-1 text-xs text-slate-500">
                  Statut recharge: {formatCompatibility(chargingPoints.find((point) => point.id === activeId)?.compatibility ?? 'verify')}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {chargingPoints.find((point) => point.id === activeId)?.city} · {chargingPoints.find((point) => point.id === activeId)?.address}
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </Map>
      </APIProvider>
    </div>
  );
}
