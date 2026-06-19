import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { Pill, SectionTitle } from '../components/Badges';
import { PageSeo } from '../components/PageSeo';
import { GoogleMapView } from '../components/GoogleMapView';
import { MapView } from '../components/MapView';
import { RouteOriginPanel } from '../components/RouteOriginPanel';
import { ADSENSE_SLOTS } from '../config/ads';
import { chargingPoints } from '../data/chargingPoints';
import { spots } from '../data/spots';
import { useRouteDistances } from '../hooks/use-route-distances';
import { hasGoogleMapsPublicApiKey } from '../lib/google-maps-config';
import { useRouteOrigin } from '../context/route-origin-context';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { formatRouteDistanceLabel } from '../lib/route-distance-types';
import { formatRechargeStatus } from '../lib/spot-utils';
import { getNearbySpots } from '../lib/nearby';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';
import { getOriginFromLabel } from '../lib/user-location';

const filters = ['Tous', 'Soir', 'Week-end', 'Journee', 'Recharge confirmee', 'Recharge a verifier'] as const;

export function CartePage() {
  const [active, setActive] = useState<(typeof filters)[number]>('Tous');
  const { origin } = useRouteOrigin();
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [showAllNearby, setShowAllNearby] = useState(false);

  const visibleSpots = useMemo(() => {
    switch (active) {
      case 'Soir':
        return spots.filter((spot) => spot.category === 'soir');
      case 'Week-end':
        return spots.filter((spot) => spot.category === 'weekend');
      case 'Journee':
        return spots.filter((spot) => spot.category === 'journee');
      default:
        return spots;
    }
  }, [active]);

  const visibleCharge = useMemo(() => {
    if (active === 'Recharge confirmee') {
      return chargingPoints.filter((point) => point.compatibility === 'confirmed-220v');
    }
    if (active === 'Recharge a verifier') {
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

  const originMessage = `Depuis ${getOriginFromLabel(origin)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Carte trottinette Aix : sorties et recharge"
        description="Consultez la carte des sorties en trottinette autour d'Aix-en-Provence avec points de recharge, trajets indicatifs et sorties proches."
        path="/carte"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/carte',
            title: 'Carte trottinette Aix : sorties et recharge',
            description:
              "Consultez la carte des sorties en trottinette autour d'Aix-en-Provence avec points de recharge, trajets indicatifs et sorties proches.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Carte', path: '/carte' },
          ]),
        ])}
      />
      <SectionTitle description="Compare rapidement les sorties proches et les points de recharge autour d'Aix.">
        Carte interactive
      </SectionTitle>

      <RouteOriginPanel
        className="mt-5"
        compact
        title="Depart du trajet"
        description="Utilise Aix, ta position ou une adresse pour recalculer la carte et les sorties proches."
      />

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
                {showAllNearby ? 'Reduire' : 'Afficher toutes les sorties'}
              </button>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{originMessage}. Distances directes indicatives.</p>
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
                    <p className="mt-2 text-sm leading-6 text-slate-600">A proximite · {directDistanceKm.toFixed(1)} km en direct</p>
                    {routeDistance?.durationLabel ? (
                      <p className="mt-1 text-xs text-slate-500">Duree velo estimee : {routeDistance.durationLabel}</p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSpotId(spot.id)}
                        className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Voir sur la carte
                      </button>
                      <a
                        href={buildGoogleMapsBikeDirectionsUrl(spot.latitude, spot.longitude, origin)}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-sky px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Itineraire velo
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Legende</p>
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
              <p className="mt-4 text-xs leading-5 text-slate-500">Google Maps n'est pas active ici. La carte Leaflet reste disponible.</p>
            ) : null}
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Sortie selectionnee</p>
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
                  {selectedRouteDistance ? formatRouteDistanceLabel(selectedRouteDistance) : `Distance indicative depuis ${getOriginFromLabel(origin)}`}
                  : {(selectedRouteDistance?.distanceKm ?? selectedSpot.distanceKmFromAix).toFixed(1)} km
                </p>
                {selectedRouteDistance?.durationLabel ? <p className="mt-1">Duree velo estimee : {selectedRouteDistance.durationLabel}</p> : null}
                <p className="mt-1">Recharge : {formatRechargeStatus(selectedSpot.rechargeStatus)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill tone="sky">
                    {selectedRouteDistance ? formatRouteDistanceLabel(selectedRouteDistance) : `Distance indicative depuis ${getOriginFromLabel(origin)}`}
                  </Pill>
                  <Link className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white" to={`/sorties/${selectedSpot.id}`}>
                    Voir la fiche
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <AdSlot
            className="hidden lg:block"
            slotId={ADSENSE_SLOTS.carteSidebarBanner}
            label="Banniere carte desktop"
          />
        </div>
      </section>
    </div>
  );
}
