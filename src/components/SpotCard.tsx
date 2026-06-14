import { Link } from 'react-router-dom';
import type { Spot } from '../data/spots';
import {
  areaLabel,
  autonomyRecommendation,
  categoryLabel,
  formatBudget,
  formatRechargeStatus,
} from '../lib/spot-utils';
import { Pill } from './Badges';

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{spot.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Distance indicative {spot.distanceLabel} · {spot.duration} · {areaLabel(spot.area)}
          </p>
        </div>
        <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
          {formatRechargeStatus(spot.rechargeStatus)}
        </Pill>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{spot.description}</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-slate-500">Budget</dt>
          <dd className="mt-1 font-semibold text-slate-950">{formatBudget(spot.budget)}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-slate-500">Moment</dt>
          <dd className="mt-1 font-semibold text-slate-950">{categoryLabel(spot.category)}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-slate-500">Autonomie estimée</dt>
          <dd className="mt-1 font-semibold text-slate-950">{autonomyRecommendation(spot.distanceKmFromAix)}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <dt className="text-slate-500">Ambiance</dt>
          <dd className="mt-1 font-semibold text-slate-950">{spot.moods.join(', ')}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap gap-2">
        {spot.moods.map((mood) => (
          <Pill key={mood}>{mood}</Pill>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">{spot.tips[0]}</span>
        <Link
          to={`/sorties/${spot.id}`}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky"
        >
          Voir la fiche
        </Link>
      </div>
    </article>
  );
}
