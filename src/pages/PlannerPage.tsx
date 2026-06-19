import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionKicker, SectionTitle, Pill } from '../components/Badges';
import { RouteOriginSearch } from '../components/RouteOriginSearch';
import { useRouteDistances } from '../hooks/use-route-distances';
import { spots } from '../data/spots';
import {
  getPlannerRecommendations,
  getTripTypeLabel,
  getMoodLabel,
  getPrudenceLabel,
  prudenceOptions,
  moodOptions,
  tripTypeOptions,
  type PlannerMood,
  type PlannerPrudence,
  type PlannerTripType,
} from '../lib/planner';
import { formatRouteDistanceLabel } from '../lib/route-distance-types';
import { useRouteOrigin } from '../context/route-origin-context';
import { getOriginFromLabel, getOriginSourceLabel, type RouteOriginSource } from '../lib/user-location';

const autonomyOptions = [20, 30, 40, 60, 80] as const;

export function PlannerPage() {
  const [autonomyKm, setAutonomyKm] = useState(40);
  const [tripType, setTripType] = useState<PlannerTripType>('evening');
  const [primaryMood, setPrimaryMood] = useState<PlannerMood>('calme');
  const [prudence, setPrudence] = useState<PlannerPrudence>('easy-only');
  const { origin, isLocating, statusMessage, useCustomOrigin, useDefaultOrigin, useUserLocation } = useRouteOrigin();
  const [departureChoice, setDepartureChoice] = useState<RouteOriginSource>(origin.source);

  useEffect(() => {
    setDepartureChoice(origin.source);
  }, [origin.source]);

  const preferences = useMemo(
    () => ({
      autonomyKm,
      tripType,
      primaryMood,
      prudence,
    }),
    [autonomyKm, tripType, primaryMood, prudence],
  );

  const routeDistances = useRouteDistances(spots, origin);
  const routeDistanceById = useMemo(
    () =>
      Object.fromEntries(Object.entries(routeDistances).map(([id, value]) => [id, value.distanceKm])) as Record<
        string,
        number
      >,
    [routeDistances],
  );

  const recommendations = useMemo(
    () => getPlannerRecommendations(spots, preferences, 8, routeDistanceById),
    [preferences, routeDistanceById],
  );
  const chosenTrip = getTripTypeLabel(tripType);
  const chosenMood = getMoodLabel(primaryMood);
  const chosenPrudence = getPrudenceLabel(prudence);

  async function handleDepartureChoice(choice: 'default-aix' | 'user-location') {
    setDepartureChoice(choice);
    if (choice === 'default-aix') {
      useDefaultOrigin();
      return;
    }

    const accepted = await useUserLocation();
    if (!accepted) {
      setDepartureChoice('default-aix');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Une estimation simple pour trier les sorties selon ton autonomie.">
        Preparer ma sortie
      </SectionTitle>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Planification rapide</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Point de depart</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Choisis ton point de depart. Les estimations restent a confirmer sur le trajet reel.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleDepartureChoice('default-aix')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                departureChoice === 'default-aix'
                  ? 'bg-slate-950 text-white shadow-soft'
                  : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
              }`}
            >
              Aix-en-Provence
            </button>
            <button
              type="button"
              onClick={() => handleDepartureChoice('user-location')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                departureChoice === 'user-location'
                  ? 'bg-slate-950 text-white shadow-soft'
                  : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
              }`}
            >
              Ma position actuelle
            </button>
          </div>

          <div className="mt-4">
            <RouteOriginSearch
              onSelect={(nextOrigin) => {
                setDepartureChoice('custom-search');
                useCustomOrigin(nextOrigin);
              }}
            />
          </div>

          {statusMessage ? (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {statusMessage}
            </div>
          ) : null}
          {isLocating ? <p className="mt-3 text-sm text-slate-500">Localisation en cours...</p> : null}

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-950">Autonomie disponible en km</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {autonomyOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAutonomyKm(value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      autonomyKm === value
                        ? 'bg-slate-950 text-white shadow-soft'
                        : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
                    }`}
                  >
                    {value} km
                  </button>
                ))}
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-950">Type de sortie</span>
              <select
                value={tripType}
                onChange={(event) => setTripType(event.target.value as PlannerTripType)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 focus:border-sky focus:ring-2 focus:ring-sky/20"
              >
                {tripTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-950">Envie principale</span>
              <select
                value={primaryMood}
                onChange={(event) => setPrimaryMood(event.target.value as PlannerMood)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 focus:border-sky focus:ring-2 focus:ring-sky/20"
              >
                {moodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-950">Niveau de prudence</span>
              <select
                value={prudence}
                onChange={(event) => setPrudence(event.target.value as PlannerPrudence)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none ring-0 focus:border-sky focus:ring-2 focus:ring-sky/20"
              >
                {prudenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-2 rounded-[1.5rem] bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              Point de depart : <strong className="text-slate-950">{origin.label}</strong>
            </p>
            <p>
              Source : <strong className="text-slate-950">{getOriginSourceLabel(origin)}</strong>
            </p>
            <p>
              Autonomie : <strong className="text-slate-950">{autonomyKm} km</strong>
            </p>
            <p>
              Type : <strong className="text-slate-950">{chosenTrip}</strong>
            </p>
            <p>
              Envie : <strong className="text-slate-950">{chosenMood}</strong>
            </p>
            <p>
              Prudence : <strong className="text-slate-950">{chosenPrudence}</strong>
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Resultats</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Sorties recommandees</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Les sorties longues restent visibles, avec un avertissement clair.</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="sky">Estimation</Pill>
            <Pill tone="emerald">Marge</Pill>
            <Pill tone="amber">A verifier</Pill>
          </div>

          <div className="mt-6 space-y-4">
            {recommendations.map(({ spot, verdict, reasons }) => (
              <article key={spot.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{spot.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{spot.distanceLabel} · {spot.duration} · {spot.distanceKmFromAix > 30 ? 'Sortie longue' : 'Sortie locale'}</p>
                  </div>
                  <Pill
                    tone={
                      verdict.status === 'compatible'
                        ? 'emerald'
                        : verdict.status === 'limit'
                          ? 'sky'
                          : verdict.status === 'prepared'
                            ? 'amber'
                            : 'rose'
                    }
                  >
                    {verdict.label}
                  </Pill>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{spot.description}</p>
                <p className="mt-3 text-sm font-semibold text-slate-950">{verdict.detail}</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {reasons.slice(0, 4).map((reason) => (
                    <li key={reason} className="rounded-2xl bg-white px-3 py-2">
                      {reason}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>
                    {routeDistances[spot.id]
                      ? formatRouteDistanceLabel(routeDistances[spot.id])
                      : `Distance indicative depuis ${getOriginFromLabel(origin)}`}{' '}
                    {(routeDistances[spot.id]?.distanceKm ?? spot.distanceKmFromAix).toFixed(1)} km
                  </Pill>
                  <Pill>{spot.duration}</Pill>
                  {routeDistances[spot.id]?.durationLabel ? (
                    <Pill tone="sky">Duree velo estimee : {routeDistances[spot.id]?.durationLabel}</Pill>
                  ) : null}
                  <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
                    {spot.rechargeStatus === 'confirmed'
                      ? 'Recharge confirmee'
                      : spot.rechargeStatus === 'nearby'
                        ? 'Recharge possible'
                        : spot.rechargeStatus === 'verify'
                          ? 'Recharge a verifier'
                          : 'Aucune recharge connue'}
                  </Pill>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    {routeDistances[spot.id]
                      ? routeDistances[spot.id].source === 'google-routes'
                        ? `Trajet reel estime depuis ${getOriginFromLabel(routeDistances[spot.id].origin)}`
                        : 'Distance indicative'
                      : 'Distance indicative'}
                  </p>
                  <Link
                    to={`/sorties/${spot.id}`}
                    className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky"
                  >
                    Ouvrir la fiche
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-slate-950">Memo rapide</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Pour les longues distances, prevois une marge, une recharge confirmee ou un retour alternatif.</p>
        <div className="mt-4">
          <Link to="/sorties" className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
            Retour au catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
