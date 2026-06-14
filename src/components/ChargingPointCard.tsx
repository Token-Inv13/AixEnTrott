import type { ChargingPoint } from '../data/chargingPoints';
import { formatCompatibility } from '../lib/spot-utils';
import { Pill } from './Badges';

export function ChargingPointCard({ point }: { point: ChargingPoint }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{point.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {point.city} · {point.address}
          </p>
        </div>
        <Pill tone={point.compatibility === 'confirmed-220v' ? 'emerald' : point.compatibility === 'possible-220v' ? 'sky' : point.compatibility === 'car-only' ? 'amber' : 'rose'}>
          {formatCompatibility(point.compatibility)}
        </Pill>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{point.notes}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Pill>{point.access}</Pill>
        <Pill tone="slate">{point.latitude.toFixed(3)}, {point.longitude.toFixed(3)}</Pill>
      </div>
    </article>
  );
}

