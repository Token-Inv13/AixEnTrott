import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { SpotCard } from '../components/SpotCard';
import { Pill, SectionTitle } from '../components/Badges';
import { ADSENSE_SLOTS } from '../config/ads';
import { useRouteDistances } from '../hooks/use-route-distances';
import { spots, type Spot } from '../data/spots';
import { useRouteOrigin } from '../context/route-origin-context';

type FilterState = {
  distance: string;
  budget: string;
  moment: string;
  mood: string;
  recharge: string;
};

const filterGroups = {
  distance: ['0–3 km', '3–7 km', '7–15 km', '15–30 km', '+30 km'],
  budget: ['0€', '<5€', '<10€', 'variable'],
  moment: ['soir', 'weekend', 'journee'],
  mood: ['calme', 'nature', 'patrimoine', 'mer', 'village', 'marché'],
  recharge: ['confirmed', 'nearby', 'verify', 'none'],
} as const;

const groupLabels: Record<keyof typeof filterGroups, string> = {
  distance: 'Distance',
  budget: 'Budget',
  moment: 'Moment',
  mood: 'Ambiance',
  recharge: 'Recharge',
};

const valueLabels: Record<string, string> = {
  '0€': '0 €',
  '<5€': '< 5 €',
  '<10€': '< 10 €',
  weekend: 'week-end',
  soir: 'soir',
  confirmed: 'Recharge confirmee',
  nearby: 'Recharge possible',
  verify: 'Recharge a verifier',
  none: 'Aucune connue',
  journee: 'Journee',
};

const autonomyOptions = [20, 30, 40, 60, 80] as const;

function matchesFilters(spot: Spot, filters: FilterState) {
  return (
    (filters.distance === 'all' || spot.distanceLabel === filters.distance) &&
    (filters.budget === 'all' || spot.budget === filters.budget) &&
    (filters.moment === 'all' || spot.category === filters.moment) &&
    (filters.mood === 'all' || spot.moods.includes(filters.mood)) &&
    (filters.recharge === 'all' || spot.rechargeStatus === filters.recharge)
  );
}

function ChipButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
        active ? 'bg-slate-950 text-white shadow-soft' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
      }`}
    >
      {label}
    </button>
  );
}

export function SortiesPage() {
  const [searchParams] = useSearchParams();
  const { origin } = useRouteOrigin();
  const [filters, setFilters] = useState<FilterState>({
    distance: searchParams.get('distance') ?? 'all',
    budget: searchParams.get('budget') ?? 'all',
    moment: searchParams.get('moment') ?? 'all',
    mood: searchParams.get('mood') ?? 'all',
    recharge: searchParams.get('recharge') ?? 'all',
  });
  const [autonomyKm, setAutonomyKm] = useState<number | null>(40);

  const filtered = useMemo(() => spots.filter((spot) => matchesFilters(spot, filters)), [filters]);
  const leadSpots = filtered.slice(0, 3);
  const remainingSpots = filtered.slice(3);
  const routeDistances = useRouteDistances(filtered, origin);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Filtre les sorties par distance, ambiance, budget et recharge.">
        Sorties autour d'Aix
      </SectionTitle>

      <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600 shadow-soft">
        {origin.source === 'user-location' ? 'Trajets estimes depuis votre position.' : "Distances indicatives depuis Aix-en-Provence."}
      </div>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-950">Mon autonomie</p>
            <p className="text-sm leading-6 text-slate-600">Ajoute un badge simple sans masquer les sorties longues.</p>
          </div>
          <div className="flex flex-wrap gap-2">
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
            <button
              type="button"
              onClick={() => setAutonomyKm(null)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                autonomyKm == null
                  ? 'bg-slate-950 text-white shadow-soft'
                  : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
              }`}
            >
              Aucun
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-5">
        <div className="grid gap-5">
          {Object.entries(filterGroups).map(([group, values]) => (
            <div key={group} className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-950">{groupLabels[group as keyof typeof filterGroups]}</p>
                <button
                  type="button"
                  className="text-sm font-medium text-sky"
                  onClick={() => setFilters((current) => ({ ...current, [group]: 'all' }))}
                >
                  Reinitialiser
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <ChipButton
                  label="Tous"
                  active={filters[group as keyof FilterState] === 'all'}
                  onClick={() => setFilters((current) => ({ ...current, [group]: 'all' }))}
                />
                {values.map((value) => (
                  <ChipButton
                    key={value}
                    label={group === 'recharge' ? valueLabels[value] : group === 'moment' && value === 'journee' ? 'journee' : value}
                    active={filters[group as keyof FilterState] === value}
                    onClick={() => setFilters((current) => ({ ...current, [group]: value }))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {filtered.length} sortie{filtered.length > 1 ? 's' : ''} trouvee{filtered.length > 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) =>
            value !== 'all' ? <Pill key={key}>{groupLabels[key as keyof typeof filterGroups]}: {valueLabels[value] ?? value}</Pill> : null,
          )}
        </div>
      </div>

      {filtered.length ? (
        <section className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {leadSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                autonomyKm={autonomyKm ?? undefined}
                routeDistance={routeDistances[spot.id]}
              />
            ))}
          </div>

          {filtered.length > 3 ? (
            <AdSlot
              slotId={ADSENSE_SLOTS.sortiesBanner}
              label="Banniere catalogue sorties"
            />
          ) : null}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {remainingSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                spot={spot}
                autonomyKm={autonomyKm ?? undefined}
                routeDistance={routeDistances[spot.id]}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Aucune sortie ne correspond</h2>
          <p className="mt-3 text-slate-600">Assouplis un filtre pour faire revenir des idees.</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setFilters({ distance: 'all', budget: 'all', moment: 'all', mood: 'all', recharge: 'all' })}
          >
            Reinitialiser tous les filtres
          </button>
        </section>
      )}
    </div>
  );
}
