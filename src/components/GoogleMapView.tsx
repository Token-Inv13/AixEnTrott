import { useEffect, useMemo, useState } from 'react';
import { AdvancedMarker, APIProvider, InfoWindow, Map, Pin, Polyline, useMap } from '@vis.gl/react-google-maps';
import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';
import {
  buildGoogleMapsDirectionsUrl,
  getGoogleMapsMapId,
  getGoogleMapsPublicApiKey,
  GOOGLE_MAPS_PROVIDER_OPTIONS,
} from '../lib/google-maps-config';
import { decodePolyline } from '../lib/polyline';
import { type RouteDistanceDisplay } from '../lib/route-distance-types';
import { getDefaultRouteOrigin, getOriginFromLabel, type RouteOrigin } from '../lib/user-location';
import { formatCompatibility } from '../lib/spot-utils';
import { haversineKm } from '../lib/nearby';
import { SpotMapPopup } from './SpotMapPopup';

function MapBoundsController({
  spots,
  chargingPoints,
  origin,
}: {
  spots: Spot[];
  chargingPoints: ChargingPoint[];
  origin: RouteOrigin;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof google === 'undefined') {
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    const points = [
      ...spots.map((spot) => ({ lat: spot.latitude, lng: spot.longitude })),
      ...chargingPoints.map((point) => ({ lat: point.latitude, lng: point.longitude })),
      { lat: origin.latitude, lng: origin.longitude },
    ];

    points.forEach((point) => bounds.extend(point));

    if (points.length === 1) {
      map.setCenter(points[0]);
      map.setZoom(13);
      return;
    }

    map.fitBounds(bounds, 48);
  }, [chargingPoints, map, origin.latitude, origin.longitude, spots]);

  return null;
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
  const mapId = getGoogleMapsMapId();
  const selectedSpot = spots.find((spot) => spot.id === selectedSpotId) ?? null;
  const [activeId, setActiveId] = useState<string | null>(selectedSpotId ?? null);
  const activeChargingPoint = useMemo(
    () => chargingPoints.find((point) => point.id === activeId) ?? null,
    [activeId, chargingPoints],
  );
  const encodedPath = useMemo(
    () => (routePolyline ? decodePolyline(routePolyline).map((point) => ({ lat: point.lat, lng: point.lng })) : null),
    [routePolyline],
  );

  useEffect(() => {
    setActiveId(selectedSpotId ?? null);
  }, [selectedSpotId]);

  if (!apiKey) {
    return null;
  }

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft ${height}`}>
      <APIProvider apiKey={apiKey} {...GOOGLE_MAPS_PROVIDER_OPTIONS}>
        <Map
          defaultCenter={{ lat: origin.latitude, lng: origin.longitude }}
          defaultZoom={10}
          disableDefaultUI
          gestureHandling="greedy"
          mapId={mapId}
        >
          <MapBoundsController spots={spots} chargingPoints={chargingPoints} origin={origin} />

          {encodedPath ? <Polyline path={encodedPath} strokeColor="#0f172a" strokeWeight={4} strokeOpacity={0.88} /> : null}

          <AdvancedMarker position={{ lat: origin.latitude, lng: origin.longitude }} title={origin.source === 'user-location' ? 'Ma position' : origin.label}>
            <Pin
              background={origin.source === 'user-location' ? '#0f172a' : '#94a3b8'}
              borderColor="#ffffff"
              glyphColor="#ffffff"
            />
          </AdvancedMarker>

          {spots.map((spot) => (
            <AdvancedMarker
              key={spot.id}
              position={{ lat: spot.latitude, lng: spot.longitude }}
              title={spot.name}
              onClick={() => {
                setActiveId(spot.id);
                onSelectSpot?.(spot.id);
              }}
            >
              <Pin background="#2563eb" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          ))}

          {chargingPoints.map((point) => (
            <AdvancedMarker
              key={point.id}
              position={{ lat: point.latitude, lng: point.longitude }}
              title={point.name}
              onClick={() => {
                setActiveId(point.id);
                onSelectSpot?.(null);
              }}
            >
              <Pin background="#0f766e" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          ))}

          {selectedSpot && activeId === selectedSpot.id ? (
            <InfoWindow position={{ lat: selectedSpot.latitude, lng: selectedSpot.longitude }} onCloseClick={() => setActiveId(null)}>
              <SpotMapPopup
                spot={selectedSpot}
                origin={origin}
                originLabel={getOriginFromLabel(origin)}
                directDistanceKm={haversineKm(origin.latitude, origin.longitude, selectedSpot.latitude, selectedSpot.longitude)}
                routeDistance={routeDistanceBySpotId[selectedSpot.id]}
              />
            </InfoWindow>
          ) : null}

          {activeChargingPoint && activeId === activeChargingPoint.id ? (
            <InfoWindow position={{ lat: activeChargingPoint.latitude, lng: activeChargingPoint.longitude }} onCloseClick={() => setActiveId(null)}>
              <div className="max-w-[14rem]">
                <h3 className="text-sm font-semibold text-slate-950">{activeChargingPoint.name}</h3>
                <p className="mt-1 text-xs text-slate-500">Type : Recharge</p>
                <p className="mt-1 text-xs text-slate-500">Statut recharge : {formatCompatibility(activeChargingPoint.compatibility)}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {activeChargingPoint.city} | {activeChargingPoint.address}
                </p>
                <a
                  className="mt-3 inline-flex text-xs font-semibold text-sky"
                  href={buildGoogleMapsDirectionsUrl(activeChargingPoint.latitude, activeChargingPoint.longitude, origin)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir l'itineraire
                </a>
              </div>
            </InfoWindow>
          ) : null}
        </Map>
      </APIProvider>
    </div>
  );
}
