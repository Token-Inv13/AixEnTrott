import { getBicycleRouteWarning } from '../lib/route-distance-types';

export function RouteMethodNotice({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950 ${className}`.trim()}>
      {getBicycleRouteWarning()}
    </div>
  );
}
