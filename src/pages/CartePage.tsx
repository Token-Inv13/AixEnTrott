import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, SectionTitle } from '../components/Badges';
import { GoogleMapView } from '../components/GoogleMapView';
import { MapView } from '../components/MapView';
import { chargingPoints } from '../data/chargingPoints';
import { spots } from '../data/spots';
import { useRouteDistance } from '../hooks/use-route-distances';
import { hasGoogleMapsPublicApiKey } from '../lib/google-maps-config';
import { useRouteOrigin } from '../context/route-origin-context';

const filters = ['Tous', 'Soir', 'Week-end', 'Journée', 'Recharge confirmée', 'Recharge à vérifier'] as const;

export function CartePage() {
  const [active, setActive] = useState<(typeof filters)[number]>('Tous');
  const { origin, statusMessage, isLocating, useUserLocation } = useRouteOrigin();
  const [localMessage, setLocalMessage] = useState<string | null>(null);

  const visibleSpots = useMemo(() => {
    switch (active) {
      case 'Soir':
        return spots.filter((spot) => spot.category === 'soir');
      case 'Week-end':
        return spots.filter((spot) => spot.category === 'weekend');
      case 'Journée':
        return spots.filter((spot) => spot.category === 'journee');
      default:
        return spots;
    }
  }, [active]);

  const visibleCharge = useMemo(() => {
    if (active === 'Recharge confirmée') {
      return chargingPoints.filter((point) => point.compatibility === 'confirmed-220v');
    }
    if (active === 'Recharge à vérifier') {
      return chargingPoints.filter((point) => point.compatibility === 'verify' || point.compatibility === 'possible-220v');
    }
    return chargingPoints;
  }, [active]);

  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(spots[0]?.id ?? null);

  useEffect(() => {
    if (!visibleSpots.some((spot) => spot.id === selectedSpotId)) {
      setSelectedSpotId(visibleSpots[0]?.id ?? null);
    }
  }, [visibleSpots, selectedSpotId]);

  const selectedSpot = visibleSpots.find((spot) => spot.id === selectedSpotId) ?? visibleSpots[0] ?? null;
  const selectedRouteDistance = useRouteDistance(selectedSpot, origin);
  const hasGoogleMaps = hasGoogleMapsPublicApiKey();

  async function handleLocateMe() {
    setLocalMessage(null);
    const accepted = await useUserLocation();
    if (!accepted) {
      setLocalMessage('Localisation refusée. Distances calculées depuis Aix-en-Provence.');
    }
  }

  const originMessage =
    origin.source === 'user-location'
      ? 'Distances calculées depuis votre position.'
      : 'Distances calculées depuis Aix-en-Provence.';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Carte interactive avec marqueurs des sorties et des solutions de recharge, plus une légende lisible pour éviter les confusions.">
        Carte interactive
      </SectionTitle>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleLocateMe}
          className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
        >
          Me localiser
        </button>
        <div className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          {originMessage}
        </div>
      </div>
      {statusMessage ? (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-soft">
          {statusMessage}
        </div>
      ) : null}
      {localMessage ? (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-soft">
          {localMessage}
        </div>
      ) : null}
      {isLocating ? <p className="mt-3 text-sm text-slate-500">Localisation en cours…</p> : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === filter ? 'bg-slate-950 text-white shadow-soft' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {hasGoogleMaps ? (
          <GoogleMapView
            spots={visibleSpots}
            chargingPoints={visibleCharge}
            selectedSpotId={selectedSpot?.id ?? null}
            origin={origin}
            routePolyline={selectedRouteDistance?.encodedPolyline}
            routeDistanceBySpotId={selectedSpot ? { [selectedSpot.id]: selectedRouteDistance ?? undefined } : {}}
            height="h-[26rem]"
            onSelectSpot={(spotId) => setSelectedSpotId(spotId)}
          />
        ) : (
          <MapView
            spots={visibleSpots}
            chargingPoints={visibleCharge}
            origin={origin}
            routePolyline={selectedRouteDistance?.encodedPolyline}
            routeDistanceBySpotId={selectedSpot ? { [selectedSpot.id]: selectedRouteDistance ?? undefined } : {}}
            height="h-[26rem]"
          />
        )}

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Légende</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-sky-600" />
                Sorties
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-emerald-700" />
                Recharge
              </div>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-slate-700" />
                Origine
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Sortie sélectionnée</p>
            <select
              value={selectedSpot?.id ?? ''}
              onChange={(event) => setSelectedSpotId(event.target.value)}
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-sky focus:ring-2 focus:ring-sky/20"
            >
              {visibleSpots.map((spot) => (
                <option key={spot.id} value={spot.id}>
                  {spot.name}
                </option>
              ))}
            </select>
            {selectedSpot ? (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <p className="font-semibold text-slate-950">{selectedSpot.name}</p>
                <p className="mt-2">
                  {selectedRouteDistance
                    ? selectedRouteDistance.origin.source === 'user-location'
                      ? 'Distance calculée depuis votre position'
                      : 'Distance calculée depuis Aix-en-Provence'
                    : 'Distance indicative depuis Aix-en-Provence'}
                  : {(selectedRouteDistance?.distanceKm ?? selectedSpot.distanceKmFromAix).toFixed(1)} km
                </p>
                {selectedRouteDistance?.durationLabel ? <p className="mt-1">Durée vélo estimée : {selectedRouteDistance.durationLabel}</p> : null}
                <p className="mt-1">Recharge : {selectedSpot.rechargeStatus}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill tone="sky">
                    {selectedRouteDistance
                      ? selectedRouteDistance.origin.source === 'user-location'
                        ? 'Distance calculée depuis votre position'
                        : 'Distance calculée depuis Aix-en-Provence'
                      : 'Distance indicative depuis Aix-en-Provence'}
                  </Pill>
                  <Link className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white" to={`/sorties/${selectedSpot.id}`}>
                    Voir la fiche
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Filtres simples</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Utilise cette carte pour comparer rapidement la proximité, le type de sortie et la présence d’une recharge confirmée ou à vérifier.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="sky">sorties</Pill>
              <Pill tone="emerald">recharge</Pill>
              <Pill tone="amber">vérification</Pill>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Les itinéraires vélo Google Maps sont indicatifs et peuvent ne pas refléter toutes les pistes cyclables ou zones adaptées aux trottinettes.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Accès rapide</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white" to="/sorties">
                Voir le catalogue
              </Link>
              <Link className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white" to="/recharge">
                Guide recharge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
