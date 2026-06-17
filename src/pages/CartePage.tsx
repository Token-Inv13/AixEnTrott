import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, SectionTitle } from '../components/Badges';
import { GoogleMapView } from '../components/GoogleMapView';
import { MapView } from '../components/MapView';
import { chargingPoints } from '../data/chargingPoints';
import { spots } from '../data/spots';
import { useRouteDistances } from '../hooks/use-route-distances';
import { hasGoogleMapsPublicApiKey } from '../lib/google-maps-config';
import { useRouteOrigin } from '../context/route-origin-context';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { formatRechargeStatus } from '../lib/spot-utils';
import { getNearbySpots } from '../lib/nearby';

const filters = ['Tous', 'Soir', 'Week-end', 'Journée', 'Recharge confirmée', 'Recharge à vérifier'] as const;

export function CartePage() {
  const [active, setActive] = useState<(typeof filters)[number]>('Tous');
  const { origin, statusMessage, isLocating, useUserLocation, useDefaultOrigin } = useRouteOrigin();
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [showAllNearby, setShowAllNearby] = useState(false);

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

  const nearbySpots = useMemo(() => getNearbySpots(visibleSpots, origin, 8), [visibleSpots, origin]);
  const displayedNearbySpots = showAllNearby ? nearbySpots : nearbySpots.slice(0, 6);
  const routeDistances = useRouteDistances(visibleSpots, origin);
  const selectedSpot = visibleSpots.find((spot) => spot.id === selectedSpotId) ?? nearbySpots[0]?.spot ?? null;
  const selectedRouteDistance = selectedSpot ? routeDistances[selectedSpot.id] : undefined;
  const hasGoogleMaps = hasGoogleMapsPublicApiKey();

  useEffect(() => {
    if (selectedSpot && visibleSpots.some((spot) => spot.id === selectedSpot.id)) {
      return;
    }
    setSelectedSpotId(nearbySpots[0]?.spot.id ?? null);
  }, [nearbySpots, selectedSpot, visibleSpots]);

  async function handleLocateMe() {
    setLocalMessage(null);
    const accepted = await useUserLocation();
    if (!accepted) {
      setLocalMessage('Localisation refusée. Les distances restent calculées depuis Aix-en-Provence.');
    }
  }

  function handleBackToAix() {
    setLocalMessage(null);
    useDefaultOrigin();
  }

  const originMessage =
    origin.source === 'user-location'
      ? 'Distances depuis votre position'
      : 'Distances depuis Aix-en-Provence';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Carte utile pour comparer la proximité, la recharge et les sorties autour d’Aix.">
        Carte interactive
      </SectionTitle>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleLocateMe}
          className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
        >
          Me localiser
        </button>
        <button
          type="button"
          onClick={handleLocateMe}
          className="inline-flex rounded-full bg-sky px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky/90"
        >
          Voir autour de moi
        </button>
        <button
          type="button"
          onClick={handleBackToAix}
          className="inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-sky-50"
        >
          Revenir à Aix
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

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {hasGoogleMaps ? (
          <GoogleMapView
            spots={visibleSpots}
            chargingPoints={visibleCharge}
            selectedSpotId={selectedSpot?.id ?? null}
            origin={origin}
            routePolyline={selectedRouteDistance?.encodedPolyline}
            routeDistanceBySpotId={routeDistances}
            height="h-[26rem]"
            onSelectSpot={(spotId) => setSelectedSpotId(spotId)}
          />
        ) : (
          <MapView
            spots={visibleSpots}
            chargingPoints={visibleCharge}
            origin={origin}
            routePolyline={selectedRouteDistance?.encodedPolyline}
            routeDistanceBySpotId={routeDistances}
            height="h-[26rem]"
          />
        )}

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">Sorties proches</p>
              <button
                type="button"
                onClick={() => setShowAllNearby((current) => !current)}
                className="text-sm font-medium text-sky"
              >
                {showAllNearby ? 'Réduire' : 'Afficher toutes les sorties'}
              </button>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {originMessage}. Distance directe indicative. Trajet réel à vérifier.
            </p>
            <div className="mt-4 space-y-3">
              {displayedNearbySpots.map(({ spot, directDistanceKm }) => {
                const routeDistance = routeDistances[spot.id];
                return (
                  <article key={spot.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950">{spot.name}</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {spot.distanceLabel} · {spot.duration}
                        </p>
                      </div>
                      <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
                        {formatRechargeStatus(spot.rechargeStatus)}
                      </Pill>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      À proximité · Distance directe indicative : {directDistanceKm.toFixed(1)} km
                    </p>
                    {routeDistance?.durationLabel ? (
                      <p className="mt-1 text-xs text-slate-500">Durée vélo estimée : {routeDistance.durationLabel}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSpotId(spot.id)}
                        className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Voir la fiche
                      </button>
                      <a
                        href={buildGoogleMapsBikeDirectionsUrl(spot.latitude, spot.longitude)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-sky px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Itinéraire vélo
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

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
            {!hasGoogleMaps ? (
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Google Maps n’est pas activé sur ce déploiement. Leaflet reste le fallback principal.
              </p>
            ) : null}
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
                <p className="mt-1">Recharge : {formatRechargeStatus(selectedSpot.rechargeStatus)}</p>
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
        </div>
      </section>
    </div>
  );
}
