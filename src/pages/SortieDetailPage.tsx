import { Link, Navigate, useParams } from 'react-router-dom';
import { MapView } from '../components/MapView';
import { Pill, SectionKicker } from '../components/Badges';
import { buildReportIssueMailto } from '../config/site';
import { useRouteDistance } from '../hooks/use-route-distances';
import { spots } from '../data/spots';
import { buildGoogleMapsBikeDirectionsUrl } from '../lib/maps';
import { formatRouteDistanceLabel } from '../lib/route-distance-types';
import { getPlannerShortWarning } from '../lib/planner';
import {
  areaLabel,
  autonomyRecommendation,
  destinationShortLabel,
  formatBudget,
  formatDifficulty,
  formatRechargeStatus,
  formatRoadSafetyLevel,
  formatRouteType,
} from '../lib/spot-utils';
import { useRouteOrigin } from '../context/route-origin-context';

export function SortieDetailPage() {
  const { id } = useParams();
  const spot = spots.find((item) => item.id === id);
  const { origin } = useRouteOrigin();
  const routeDistance = useRouteDistance(spot, origin);

  if (!spot) {
    return <Navigate to="/sorties" replace />;
  }

  const distanceKm = routeDistance?.distanceKm ?? spot.distanceKmFromAix;
  const roundTripKm = distanceKm * 2;
  const requiredAutonomyKm = roundTripKm * 1.2;
  const planAdvice =
    distanceKm > 30
      ? 'Prévoir retour alternatif'
      : spot.rechargeStatus === 'verify' || spot.rechargeStatus === 'none'
        ? 'Recharge à vérifier'
        : distanceKm > 7
          ? 'Prévoir marge'
          : 'Sortie simple';
  const reportMailto = buildReportIssueMailto(
    spot.name,
    typeof window !== 'undefined' ? window.location.href : `https://aixentrott.fr/sorties/${spot.id}`,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/sorties" className="text-sm font-semibold text-sky">
        ← Retour au catalogue
      </Link>

      <section className="mt-4 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Fiche sortie</SectionKicker>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{spot.name}</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">{spot.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Pill tone={routeDistance?.source === 'google-routes' ? 'emerald' : 'sky'}>
              {routeDistance ? formatRouteDistanceLabel(routeDistance) : 'Distance indicative depuis Aix-en-Provence'}
              {' '}
              {distanceKm.toFixed(1)} km
            </Pill>
            <Pill tone="emerald">{formatBudget(spot.budget)}</Pill>
            <Pill>{spot.duration}</Pill>
            <Pill>{areaLabel(spot.area)}</Pill>
            <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
              {formatRechargeStatus(spot.rechargeStatus)}
            </Pill>
            {routeDistance?.durationLabel ? <Pill tone="sky">Durée vélo estimée {routeDistance.durationLabel}</Pill> : null}
          </div>

          <div className="mt-6 grid gap-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-950">Adresse / point de destination</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{spot.address}</p>
              <p className="mt-1 text-xs text-slate-500">Repère court: {destinationShortLabel(spot.address)}</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end sm:items-start">
              <a
                href={spot.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky"
              >
                Ouvrir destination
              </a>
              <a
                href={buildGoogleMapsBikeDirectionsUrl(spot.latitude, spot.longitude)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky/90"
              >
                Itinéraire vélo Google Maps
              </a>
              <a
                href={reportMailto}
                className="inline-flex items-center justify-center rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 ring-1 ring-amber-200 transition hover:bg-amber-100"
              >
                Signaler une erreur
              </a>
            </div>
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            L’itinéraire vélo Google Maps est indicatif. Vérifie toujours la sécurité du trajet et les aménagements disponibles.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Planification rapide</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cette estimation reste indicative et applique une marge de sécurité. À vérifier avant départ, surtout sur les longues sorties.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  {routeDistance?.source === 'google-routes'
                    ? routeDistance.origin.source === 'user-location'
                      ? 'Distance aller calculée depuis votre position'
                      : 'Distance aller calculée depuis Aix-en-Provence'
                    : 'Distance aller indicative depuis Aix-en-Provence'}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{distanceKm.toFixed(1)} km</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Distance aller-retour indicative</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{roundTripKm.toFixed(1)} km</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Autonomie recommandée</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{requiredAutonomyKm.toFixed(1)} km avec marge</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Recharge connue</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">
                  {spot.rechargeStatus === 'confirmed'
                    ? 'Oui'
                    : spot.rechargeStatus === 'nearby'
                      ? 'Partielle'
                      : spot.rechargeStatus === 'verify'
                        ? 'À vérifier'
                        : 'Non'}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Conseil</p>
              <p className="mt-2 text-sm font-semibold text-slate-950">{planAdvice}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {distanceKm > 30
                  ? 'Sortie longue : prévoir train, voiture, recharge ou retour alternatif.'
                  : getPlannerShortWarning(spot)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Fiabilité des infos</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>Coordonnées : indicatives / à vérifier.</li>
              <li>Distance : indicative.</li>
              <li>Pistes cyclables : indicatives.</li>
              <li>Recharge : à vérifier avant départ.</li>
            </ul>
            <div className="mt-4">
              <a
                href={reportMailto}
                className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky"
              >
                Signaler une erreur
              </a>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Autonomie estimée</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{autonomyRecommendation(distanceKm)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Ambiance</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{spot.moods.join(', ')}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Distance indicative</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{distanceKm} km depuis Aix</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Budget</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{formatBudget(spot.budget)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Difficulté</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">
                {formatDifficulty(spot.difficulty)} · {formatRouteType(spot.routeType).toLowerCase()}
              </dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-950">Pistes cyclables / sécurité</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{spot.cyclingInfrastructure.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{spot.cyclingInfrastructure.notes}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Niveau de prudence</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{formatRoadSafetyLevel(spot.roadSafety.level)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{spot.roadSafety.notes}</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-slate-950">Conseil de stationnement</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{spot.parkingAdvice}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">Meilleur moment</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{spot.bestTime}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Itinéraire indicatif</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{spot.routeNotes}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Sortie simple</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {spot.isSimpleRide ? 'Oui, dans une logique de sortie simple.' : 'Non, à traiter comme une sortie préparée.'}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-slate-950">Conseils pratiques</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {spot.tips.map((tip) => (
                <li key={tip} className="rounded-2xl bg-slate-50 p-3">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Carte centrée sur le lieu</p>
            <div className="mt-4">
              <MapView
                spots={[spot]}
                chargingPoints={[]}
                showCharging={false}
                origin={origin}
                routePolyline={routeDistance?.encodedPolyline}
                height="h-[24rem]"
              />
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Recharge</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {spot.rechargeStatus === 'confirmed'
                ? 'Recharge confirmée ou proche, avec marge confortable.'
                : spot.rechargeStatus === 'nearby'
                  ? 'Recharge possible à proximité, mais vérifie toujours la prise réelle avant de compter dessus.'
                  : spot.rechargeStatus === 'verify'
                    ? 'Recharge à vérifier avant le départ; ne pars pas dessus sans confirmation.'
                    : 'Aucune recharge connue sur place. Prévois un plan B.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
