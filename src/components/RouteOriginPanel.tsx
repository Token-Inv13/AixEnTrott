import { RouteOriginSearch } from './RouteOriginSearch';
import { useRouteOrigin } from '../context/route-origin-context';
import { getOriginSourceLabel } from '../lib/user-location';

type RouteOriginPanelProps = {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
};

export function RouteOriginPanel({
  title = 'Point de depart',
  description = 'Choisis Aix, ta position actuelle ou une adresse precise. Les trajets restent indicatifs et a verifier avant depart.',
  className = '',
  compact = false,
}: RouteOriginPanelProps) {
  const { origin, isLocating, statusMessage, useCustomOrigin, useDefaultOrigin, useUserLocation } = useRouteOrigin();

  return (
    <section className={`min-w-0 max-w-full rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-5 ${className}`.trim()}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950">{title}</p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
          <span className="font-medium text-slate-950">{origin.label}</span>
          <span className="ml-2 text-slate-500">| {getOriginSourceLabel(origin)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={useDefaultOrigin}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            origin.source === 'default-aix'
              ? 'bg-slate-950 text-white shadow-soft'
              : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
          }`}
        >
          Aix-en-Provence
        </button>
        <button
          type="button"
          onClick={() => {
            void useUserLocation();
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            origin.source === 'user-location'
              ? 'bg-slate-950 text-white shadow-soft'
              : 'bg-slate-50 text-slate-600 ring-1 ring-slate-200 hover:bg-sky-50'
          }`}
        >
          Ma position
        </button>
      </div>

      <div className="mt-4">
        <RouteOriginSearch
          embedded
          onSelect={(nextOrigin) => {
            useCustomOrigin(nextOrigin);
          }}
        />
      </div>

      {statusMessage ? (
        <div className={`mt-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm leading-6 text-slate-600 ${compact ? 'p-3' : 'p-4'}`}>
          {statusMessage}
        </div>
      ) : null}
      {isLocating ? <p className="mt-3 text-sm text-slate-500">Localisation en cours...</p> : null}
    </section>
  );
}
