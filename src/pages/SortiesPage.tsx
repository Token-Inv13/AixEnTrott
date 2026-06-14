import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SpotCard } from '../components/SpotCard';
import { Pill, SectionTitle } from '../components/Badges';
import { spots, type Spot } from '../data/spots';
import { formatRechargeStatus } from '../lib/spot-utils';

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
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-slate-950 text-white shadow-soft' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
      }`}
    >
      {label}
    </button>
  );
}

export function SortiesPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    distance: searchParams.get('distance') ?? 'all',
    budget: searchParams.get('budget') ?? 'all',
    moment: searchParams.get('moment') ?? 'all',
    mood: searchParams.get('mood') ?? 'all',
    recharge: searchParams.get('recharge') ?? 'all',
  });

  const filtered = useMemo(() => spots.filter((spot) => matchesFilters(spot, filters)), [filters]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle
        description="Catalogue filtrable des sorties. Toutes les distances sont indicatives et les statuts de recharge restent prudents par défaut."
      >
        Sorties autour d’Aix
      </SectionTitle>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
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
                  Réinitialiser
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
                    label={value}
                    active={filters[group as keyof FilterState] === value}
                    onClick={() => setFilters((current) => ({ ...current, [group]: value }))}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {filtered.length} sortie{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) =>
            value !== 'all' ? <Pill key={key}>{key}: {value}</Pill> : null,
          )}
        </div>
      </div>

      {filtered.length ? (
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Aucune sortie ne correspond</h2>
          <p className="mt-3 text-slate-600">Essaie d’assouplir un filtre pour faire réapparaître des idées.</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            onClick={() => setFilters({ distance: 'all', budget: 'all', moment: 'all', mood: 'all', recharge: 'all' })}
          >
            Réinitialiser tous les filtres
          </button>
        </section>
      )}
    </div>
  );
}
