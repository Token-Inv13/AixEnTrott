import { Link } from 'react-router-dom';
import { chargingPoints } from '../data/chargingPoints';
import { distanceBands, spots } from '../data/spots';
import { areaLabel, formatRechargeStatus } from '../lib/spot-utils';
import { Pill, SectionKicker, SectionTitle } from '../components/Badges';
import { MapView } from '../components/MapView';

const quickActions = [
  { to: '/sorties?moment=soir', label: 'Je veux sortir ce soir', tone: 'sky' as const },
  { to: '/sorties?moment=weekend', label: 'Je veux une sortie week-end', tone: 'emerald' as const },
  { to: '/recharge', label: 'Je cherche une recharge', tone: 'amber' as const },
];

export function HomePage() {
  const highlights = spots.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <SectionKicker>trott-out-aix</SectionKicker>
          <SectionTitle description="Un mini-site statique pour choisir rapidement une sortie en trottinette électrique autour d’Aix-en-Provence, avec cartes, filtres et recharge.">
            Prépare ta sortie en trottinette autour d’Aix-en-Provence
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Les contenus du guide ont été structurés par distance, budget, ambiance et solution de recharge pour te
            faire gagner du temps, sans masquer les contraintes réelles d’autonomie.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`inline-flex items-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  action.tone === 'sky'
                    ? 'bg-sky text-white shadow-soft hover:bg-sky/90'
                    : action.tone === 'emerald'
                      ? 'bg-emerald-600 text-white shadow-soft hover:bg-emerald-700'
                      : 'bg-amber-400 text-slate-950 shadow-soft hover:bg-amber-300'
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {distanceBands.map((band) => (
              <div key={band} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Zone</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{band}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">Carte utile</p>
                <p className="text-sm text-slate-500">Sorties et recharge autour d’Aix</p>
              </div>
              <Pill tone="sky">OpenStreetMap</Pill>
            </div>
            <div className="mt-4">
              <MapView spots={spots.slice(0, 8)} chargingPoints={chargingPoints.slice(0, 4)} height="h-[19rem]" />
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Résumé rapide</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Sorties prêtes', value: spots.length },
                { label: 'Points recharge', value: chargingPoints.length },
                { label: 'Zones couvertes', value: 5 },
                { label: 'Avertissement', value: 'Recharge à vérifier' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: '0–3 km',
            text: 'Boucles immédiates pour le soir, sans prise de risque sur la batterie.',
            pills: ['centre', 'parcs', 'marché'],
          },
          {
            title: '3–7 km',
            text: 'Le meilleur équilibre entre respiration et autonomie pour un départ après le travail.',
            pills: ['calme', 'nature', 'patrimoine'],
          },
          {
            title: '+7 km',
            text: 'À réserver au week-end et à une sortie préparée, surtout quand la recharge n’est pas garantie.',
            pills: ['journée', 'recharge', 'retour planifié'],
          },
        ].map((block) => (
          <article key={block.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-sky">{block.title}</p>
            <p className="mt-3 text-base leading-7 text-slate-600">{block.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {block.pills.map((pill) => (
                <Pill key={pill}>{pill}</Pill>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <SectionKicker>Comment utiliser le site ?</SectionKicker>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">En 4 étapes</h2>
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            'Choisis ton temps disponible',
            'Filtre par distance ou ambiance',
            'Vérifie l’autonomie et la recharge',
            'Pars avec batterie pleine, eau, casque et antivol',
          ].map((step, index) => (
            <li key={step} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Top départ</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Sorties faciles à lancer</h2>
          <div className="mt-5 grid gap-3">
            {highlights.map((spot) => (
              <Link
                key={spot.id}
                to={`/sorties/${spot.id}`}
                className="rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-sky hover:bg-sky-50/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{spot.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Distance indicative {spot.distanceLabel} · {spot.duration} · {areaLabel(spot.area)}
                    </p>
                  </div>
                  <Pill>{formatRechargeStatus(spot.rechargeStatus)}</Pill>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Recharge</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Ce qu’il faut retenir</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li>Les bornes voiture ne sont pas automatiquement adaptées à la trottinette.</li>
            <li>Les prises 220V confirmées doivent être vérifiées au moment du départ.</li>
            <li>Bag Mobile et les solutions privées sont pratiques pour le train et les longues sorties.</li>
            <li>Chargemap, PlugShare et Google Maps servent surtout à vérifier l’existence d’une prise, pas la compatibilité réelle.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
