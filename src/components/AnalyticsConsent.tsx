import { useEffect, useState } from 'react';
import {
  OPEN_PRIVACY_SETTINGS_EVENT,
  loadGoogleAnalytics,
  openGoogleAdPrivacySettings,
  readAnalyticsConsent,
  revokeAnalyticsConsent,
  storeAnalyticsConsent,
  waitForFundingChoicesConsentData,
  type AnalyticsConsent as AnalyticsConsentValue,
} from '../lib/analytics';

const consentLabels: Record<AnalyticsConsentValue, string> = {
  unknown: 'Aucun choix enregistre',
  granted: 'Mesure d’audience acceptee',
  denied: 'Mesure d’audience refusee',
};

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<AnalyticsConsentValue>(() => readAnalyticsConsent());
  const [canAskForConsent, setCanAskForConsent] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [googlePrivacyStatus, setGooglePrivacyStatus] = useState<string | null>(null);

  useEffect(() => {
    if (consent === 'granted') {
      loadGoogleAnalytics();
    }
  }, [consent]);

  useEffect(() => {
    if (consent !== 'unknown') {
      return;
    }
    return waitForFundingChoicesConsentData(() => setCanAskForConsent(true));
  }, [consent]);

  useEffect(() => {
    const handleOpenSettings = () => {
      setGooglePrivacyStatus(null);
      setSettingsOpen(true);
    };
    window.addEventListener(OPEN_PRIVACY_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  function grantConsent() {
    storeAnalyticsConsent('granted');
    setConsent('granted');
    setSettingsOpen(false);
  }

  function denyConsent() {
    const mustReload = consent === 'granted';
    revokeAnalyticsConsent();
    setConsent('denied');
    setSettingsOpen(false);
    if (mustReload) {
      window.location.reload();
    }
  }

  async function handleGooglePrivacySettings() {
    setGooglePrivacyStatus('Ouverture des preferences publicitaires...');
    const opened = await openGoogleAdPrivacySettings();
    if (opened) {
      setSettingsOpen(false);
      setGooglePrivacyStatus(null);
      return;
    }
    setGooglePrivacyStatus(
      "Les preferences publicitaires Google sont indisponibles. Un bloqueur de publicite peut empecher leur ouverture.",
    );
  }

  const showInitialChoice = consent === 'unknown' && canAskForConsent && !settingsOpen;

  return (
    <>
      {showInitialChoice ? (
        <aside
          aria-labelledby="analytics-consent-title"
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-2xl rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 sm:bottom-5 sm:p-6"
        >
          <p id="analytics-consent-title" className="text-base font-semibold text-slate-950">
            Mesure d’audience
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Google Analytics nous aide a comprendre les pages consultees et a ameliorer Aix en trott. Aucun suivi
            Analytics n'est charge sans ton accord.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={grantConsent}
              className="min-h-11 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Accepter la mesure d’audience
            </button>
            <button
              type="button"
              onClick={denyConsent}
              className="min-h-11 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky focus-visible:ring-offset-2"
            >
              Refuser
            </button>
          </div>
        </aside>
      ) : null}

      {settingsOpen ? (
        <div className="fixed inset-0 z-[80] grid place-items-end bg-slate-950/35 p-3 sm:place-items-center sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-settings-title"
            className="w-full max-w-xl rounded-[1.75rem] bg-white p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky">Confidentialite</p>
                <h2 id="privacy-settings-title" className="mt-2 text-xl font-semibold text-slate-950">
                  Parametres de confidentialite
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Fermer les parametres de confidentialite"
                className="rounded-full px-3 py-2 text-sm font-semibold text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Fermer
              </button>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-950">Mesure d’audience</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{consentLabels[consent]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={grantConsent}
                  className="min-h-11 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
                >
                  Accepter
                </button>
                <button
                  type="button"
                  onClick={denyConsent}
                  className="min-h-11 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-100"
                >
                  Refuser
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-950">Publicite</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Les choix publicitaires sont geres par le message certifie de Google.
              </p>
              <button
                type="button"
                onClick={() => void handleGooglePrivacySettings()}
                className="mt-3 min-h-11 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50"
              >
                Ouvrir les preferences publicitaires
              </button>
              {googlePrivacyStatus ? (
                <p className="mt-3 text-sm leading-6 text-slate-500">{googlePrivacyStatus}</p>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
