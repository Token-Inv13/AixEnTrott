import { Link, Navigate, useParams } from 'react-router-dom';
import { MapView } from '../components/MapView';
import { Pill, SectionKicker } from '../components/Badges';
import { spots } from '../data/spots';
import { areaLabel, autonomyRecommendation, formatBudget, formatRechargeStatus } from '../lib/spot-utils';

export function SortieDetailPage() {
  const { id } = useParams();
  const spot = spots.find((item) => item.id === id);

  if (!spot) {
    return <Navigate to="/sorties" replace />;
  }

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
            <Pill tone="sky">Distance indicative {spot.distanceLabel}</Pill>
            <Pill tone="emerald">{formatBudget(spot.budget)}</Pill>
            <Pill>{spot.duration}</Pill>
            <Pill>{areaLabel(spot.area)}</Pill>
            <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
              {formatRechargeStatus(spot.rechargeStatus)}
            </Pill>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Autonomie estimée</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{autonomyRecommendation(spot.distanceKmFromAix)}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Ambiance</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{spot.moods.join(', ')}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Distance indicative</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{spot.distanceKmFromAix} km depuis Aix</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Budget</dt>
              <dd className="mt-2 text-sm font-semibold text-slate-950">{formatBudget(spot.budget)}</dd>
            </div>
          </dl>

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
              <MapView spots={[spot]} chargingPoints={[]} showCharging={false} height="h-[24rem]" />
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
