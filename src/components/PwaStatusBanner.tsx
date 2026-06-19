import { useState } from 'react';
import { usePwaStatus } from '../hooks/use-pwa-status';

export function PwaStatusBanner() {
  const { isOffline, updateReady, installUpdate } = usePwaStatus();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed || (!isOffline && !updateReady)) {
    return null;
  }

  if (updateReady) {
    return (
      <div className="border-b border-sky-200 bg-sky-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6 lg:px-8">
          <p className="text-slate-700">Nouvelle version de l'app disponible. Recharge la PWA pour recuperer la derniere carte et les derniers trajets.</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                void installUpdate();
              }}
              className="rounded-full bg-slate-950 px-4 py-2 font-semibold text-white transition hover:bg-sky"
            >
              Mettre a jour
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="rounded-full bg-white px-4 py-2 font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm sm:px-6 lg:px-8">
        <p className="text-amber-950">
          Mode hors ligne actif. Les pages deja ouvertes restent disponibles, mais la carte Google et les trajets temps reel peuvent manquer.
        </p>
        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="rounded-full bg-white px-4 py-2 font-semibold text-amber-900 ring-1 ring-amber-200 transition hover:bg-amber-100"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
