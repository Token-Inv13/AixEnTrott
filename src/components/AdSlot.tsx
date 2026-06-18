import { useEffect, useMemo, useRef } from 'react';
import { ADSENSE_CLIENT_ID, ADSENSE_TEST_MODE } from '../config/ads';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  slotId?: string;
  className?: string;
  label?: string;
};

function PlaceholderAd({ label, slotId }: { label: string; slotId?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Emplacement publicitaire</p>
      <p className="mt-2 text-sm font-semibold text-slate-950">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {slotId ? `Slot ${slotId} pret pour AdSense.` : 'Slot AdSense manquant. Rien ne sera affiche en production.'}
      </p>
    </div>
  );
}

export function AdSlot({ slotId, className = '', label = 'Annonce' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const showPlaceholder = import.meta.env.DEV || ADSENSE_TEST_MODE;
  const slot = slotId?.trim() ?? '';
  const shouldRenderRealAd = !showPlaceholder && slot.length > 0;
  const wrapperClassName = useMemo(
    () => ['w-full max-w-full overflow-hidden', className].filter(Boolean).join(' '),
    [className],
  );

  useEffect(() => {
    if (!shouldRenderRealAd || !adRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Leave the slot empty rather than breaking the page if AdSense blocks or delays loading.
    }
  }, [shouldRenderRealAd, slot]);

  if (!slot && !showPlaceholder) {
    return null;
  }

  if (showPlaceholder) {
    return (
      <div className={wrapperClassName}>
        <PlaceholderAd label={label} slotId={slot || undefined} />
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <div className="rounded-[1.5rem] border border-slate-200 bg-white px-3 py-3 shadow-soft">
        <ins
          ref={adRef}
          className="adsbygoogle block min-h-[110px] w-full max-w-full overflow-hidden"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
