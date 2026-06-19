import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { SectionKicker, SectionTitle, Pill } from '../components/Badges';
import { RouteMethodNotice } from '../components/RouteMethodNotice';
import { RouteOriginPanel } from '../components/RouteOriginPanel';
import { spots } from '../data/spots';
import { useRouteOrigin } from '../context/route-origin-context';
import { useRouteDistances } from '../hooks/use-route-distances';
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
import { formatAlternativeRoutesLabel, formatRouteDistanceLabel } from '../lib/route-distance-types';
import {
  assessTripForBatteryProfile,
  batteryProfiles,
  getBatteryProfile,
  getTripConstraintLabels,
  type BatteryProfileId,
} from '../lib/trip-planning';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';
import { getOriginFromLabel, getOriginSourceLabel } from '../lib/user-location';

const autonomyOptions = [20, 30, 40, 60, 80] as const;

export function PlannerPage() {
  const [autonomyKm, setAutonomyKm] = useState(40);
  const [batteryProfileId, setBatteryProfileId] = useState<BatteryProfileId>('touring-40');
  const [tripType, setTripType] = useState<PlannerTripType>('evening');
  const [primaryMood, setPrimaryMood] = useState<PlannerMood>('calme');
  const [prudence, setPrudence] = useState<PlannerPrudence>('easy-only');
  const { origin } = useRouteOrigin();
  const selectedBatteryProfile = getBatteryProfile(batteryProfileId);

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Planner trottinette Aix : autonomie et recharge"
        description="Comparez votre autonomie, la distance indicative aller-retour et les solutions de recharge pour choisir une sortie trottinette autour d'Aix."
        path="/planner"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/planner',
            title: 'Planner trottinette Aix : autonomie et recharge',
            description:
              "Comparez votre autonomie, la distance indicative aller-retour et les solutions de recharge pour choisir une sortie trottinette autour d'Aix.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Preparer', path: '/planner' },
          ]),
        ])}
      />
      <SectionTitle description="Une estimation simple pour trier les sorties selon ton autonomie.">
        Preparer ma sortie
      </SectionTitle>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Planification rapide</SectionKicker>

          <div className="mt-4">
            <RouteOriginPanel
              compact
              title="Point de depart"
              description="Choisis ton point de depart avant de comparer les sorties. Les trajets restent des estimations a confirmer."
            />
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <span className="text-sm font-semibold text-slate-950">Profil batterie</span>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {batteryProfiles.map((profile) => {
                  const isActive = profile.id === batteryProfileId;

                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => {
                        setBatteryProfileId(profile.id);
                        setAutonomyKm(profile.nominalRangeKm);
                      }}
                      className={`rounded-[1.5rem] border p-4 text-left transition ${
                        isActive
                          ? 'border-slate-950 bg-slate-950 text-white shadow-soft'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky hover:bg-white'
                      }`}
                    >
                      <p className="text-sm font-semibold">{profile.label}</p>
                      <p className={`mt-2 text-sm leading-6 ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>{profile.note}</p>
                      <p className={`mt-2 text-xs font-medium ${isActive ? 'text-slate-100' : 'text-slate-500'}`}>
                        Autonomie nominale {profile.nominalRangeKm} km · reserve {Math.round(profile.reserveRatio * 100)} %
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-950">Autonomie disponible en km</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {autonomyOptions.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setAutonomyKm(value);
                      const matchingProfile = batteryProfiles.find((profile) => profile.nominalRangeKm === value);
                      if (matchingProfile) {
                        setBatteryProfileId(matchingProfile.id);
                      }
                    }}
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
              Profil batterie : <strong className="text-slate-950">{selectedBatteryProfile.label}</strong>
            </p>
            <p>
              Type : <strong className="text-slate-950">{getTripTypeLabel(tripType)}</strong>
            </p>
            <p>
              Envie : <strong className="text-slate-950">{getMoodLabel(primaryMood)}</strong>
            </p>
            <p>
              Prudence : <strong className="text-slate-950">{getPrudenceLabel(prudence)}</strong>
            </p>
          </div>

          <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
            <p className="font-semibold text-slate-950">Lecture batterie</p>
            <p className="mt-2">
              Le profil selectionne garde une reserve indicative de {Math.round(selectedBatteryProfile.reserveRatio * 100)} % pour mieux estimer l'aller-retour.
            </p>
            <p className="mt-2">Le relief, le vent, le poids embarque et l'etat de batterie restent a verifier avant depart.</p>
          </div>
        </div>

        <div className="min-w-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Resultats</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Sorties recommandees</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Les sorties longues restent visibles, avec un avertissement clair.</p>
          <RouteMethodNotice className="mt-4" />

          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone="sky">Estimation</Pill>
            <Pill tone="emerald">Marge</Pill>
            <Pill tone="amber">A verifier</Pill>
          </div>

          <div className="mt-6 space-y-4">
            {recommendations.map(({ spot, verdict, reasons }) => {
              const routeDistance = routeDistances[spot.id];
              const oneWayKm = routeDistance?.distanceKm ?? spot.distanceKmFromAix;
              const batteryAssessment = assessTripForBatteryProfile(oneWayKm, selectedBatteryProfile, spot.rechargeStatus);
              const constraints = getTripConstraintLabels(spot, oneWayKm);

              return (
                <article key={spot.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{spot.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {spot.distanceLabel} · {spot.duration} · {spot.distanceKmFromAix > 30 ? 'Sortie longue' : 'Sortie locale'}
                      </p>
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
                      {routeDistance ? formatRouteDistanceLabel(routeDistance) : `Distance indicative depuis ${getOriginFromLabel(origin)}`}{' '}
                      {oneWayKm.toFixed(1)} km
                    </Pill>
                    <Pill>{spot.duration}</Pill>
                    {routeDistance?.durationLabel ? <Pill tone="sky">Duree velo estimee : {routeDistance.durationLabel}</Pill> : null}
                    <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
                      {spot.rechargeStatus === 'confirmed'
                        ? 'Recharge confirmee'
                        : spot.rechargeStatus === 'nearby'
                          ? 'Recharge possible'
                          : spot.rechargeStatus === 'verify'
                            ? 'Recharge a verifier'
                            : 'Aucune recharge connue'}
                    </Pill>
                    {routeDistance ? <Pill>{formatAlternativeRoutesLabel(routeDistance)}</Pill> : null}
                  </div>

                  <div className="mt-4 grid gap-3 rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-slate-500">Aller Google estime</p>
                      <p className="mt-1 font-semibold text-slate-950">{batteryAssessment.oneWayKm.toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Aller-retour indicatif</p>
                      <p className="mt-1 font-semibold text-slate-950">{batteryAssessment.roundTripKm.toFixed(1)} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Profil batterie</p>
                      <p className="mt-1 font-semibold text-slate-950">{batteryAssessment.profile.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Autonomie utile estimee</p>
                      <p className="mt-1 font-semibold text-slate-950">
                        {batteryAssessment.usableRangeKm.toFixed(1)} km utiles · reserve {batteryAssessment.reserveKm.toFixed(1)} km
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-500">Verdict aller-retour</p>
                        <p className="mt-1 text-base font-semibold text-slate-950">{batteryAssessment.label}</p>
                      </div>
                      <Pill
                        tone={
                          batteryAssessment.status === 'comfortable'
                            ? 'emerald'
                            : batteryAssessment.status === 'tight'
                              ? 'sky'
                              : batteryAssessment.status === 'recharge-needed'
                                ? 'amber'
                                : 'rose'
                        }
                      >
                        Buffer {batteryAssessment.bufferKm >= 0 ? '+' : ''}
                        {batteryAssessment.bufferKm.toFixed(1)} km
                      </Pill>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{batteryAssessment.note}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Autonomie nominale recommandee pour ce trajet: {batteryAssessment.recommendedNominalKm.toFixed(1)} km environ.
                    </p>
                  </div>

                  {constraints.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {constraints.map((constraint) => (
                        <Pill key={constraint}>{constraint}</Pill>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                      {routeDistance
                        ? routeDistance.source === 'google-routes'
                          ? `Trajet reel estime depuis ${getOriginFromLabel(routeDistance.origin)}`
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
        <p className="text-sm font-semibold text-slate-950">Memo rapide</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Pour les longues distances, croise toujours le trajet Google, la marge batterie, la recharge et les portions a verifier.
        </p>
        <div className="mt-4">
          <Link to="/sorties" className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
            Retour au catalogue
          </Link>
        </div>
      </section>
    </div>
  );
}
