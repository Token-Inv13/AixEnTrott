import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pill, SectionTitle } from '../components/Badges';
import { MapView } from '../components/MapView';
import { chargingPoints } from '../data/chargingPoints';
import { spots } from '../data/spots';

const filters = ['Tous', 'Soir', 'Week-end', 'Journée', 'Recharge confirmée', 'Recharge à vérifier'] as const;

export function CartePage() {
  const [active, setActive] = useState<(typeof filters)[number]>('Tous');

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Carte interactive avec marqueurs des sorties et des solutions de recharge, plus une légende lisible pour éviter les confusions.">
        Carte interactive
      </SectionTitle>

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

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <MapView spots={visibleSpots} chargingPoints={visibleCharge} />
        <div className="space-y-4">
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
                <span className="h-3 w-3 rounded-full border border-slate-300 bg-slate-100" />
                Centre Aix
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Filtres simples</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Utilise cette carte pour comparer rapidement la proximité, le type de sortie et la présence d’une
              recharge confirmée ou à vérifier.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill tone="sky">sorties</Pill>
              <Pill tone="emerald">recharge</Pill>
              <Pill tone="amber">vérification</Pill>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Accès rapide</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white" to="/sorties">
                Voir le catalogue
              </Link>
              <Link className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white" to="/recharge">
                Guide recharge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

