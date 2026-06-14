import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';
import { categoryLabel, formatBudget, formatCompatibility } from '../lib/spot-utils';

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
  height = 'h-[26rem]',
}: {
  spots: Spot[];
  chargingPoints: ChargingPoint[];
  showSpots?: boolean;
  showCharging?: boolean;
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
    return coords.length ? coords : ([ [43.5297, 5.4474] ] as LatLngExpression[]);
  }, [spots, chargingPoints, showSpots, showCharging]);

  return (
    <div className={`overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft ${height}`}>
      <MapContainer
        center={[43.5297, 5.4474]}
        zoom={10}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <FitBounds points={points} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showSpots
          ? spots.map((spot) => (
              <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={makeIcon('#2563eb')}>
                <Popup>
                  <div className="max-w-[16rem]">
                    <h3 className="text-sm font-semibold text-slate-950">{spot.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {categoryLabel(spot.category)} · {spot.distanceLabel} · {formatBudget(spot.budget)}
                    </p>
                    <Link className="mt-3 inline-flex text-xs font-semibold text-sky" to={`/sorties/${spot.id}`}>
                      Voir la fiche
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))
          : null}
        {showCharging
          ? chargingPoints.map((point) => (
              <Marker key={point.id} position={[point.latitude, point.longitude]} icon={makeIcon('#0f766e')}>
                <Popup>
                  <div className="max-w-[16rem]">
                    <h3 className="text-sm font-semibold text-slate-950">{point.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {point.city} · {formatCompatibility(point.compatibility)}
                    </p>
                    <Link className="mt-3 inline-flex text-xs font-semibold text-sky" to="/recharge">
                      Voir le guide recharge
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))
          : null}
        <CircleMarker center={[43.5297, 5.4474]} radius={28} pathOptions={{ color: '#94a3b8', fillColor: '#e2e8f0', fillOpacity: 0.3 }} />
      </MapContainer>
    </div>
  );
}
