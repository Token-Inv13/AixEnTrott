import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  FUNDING_CHOICES_FALLBACK_MS,
  GA_MEASUREMENT_ID,
  GA_SCRIPT_ELEMENT_ID,
} from '../config/analytics';

export type AnalyticsConsent = 'unknown' | 'granted' | 'denied';

type GoogleFcCallbackName = 'CONSENT_API_READY' | 'CONSENT_DATA_READY';
type GoogleFcCallback = Partial<Record<GoogleFcCallbackName, () => void>>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    googlefc?: {
      callbackQueue?: GoogleFcCallback[];
      showRevocationMessage?: () => void;
    };
    __aixentrottGaInitialized?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export const OPEN_PRIVACY_SETTINGS_EVENT = 'aixentrott:open-privacy-settings';

function getGoogleFcQueue() {
  const googlefc = window.googlefc ?? (window.googlefc = {});
  return googlefc.callbackQueue ?? (googlefc.callbackQueue = []);
}

export function readAnalyticsConsent(): AnalyticsConsent {
  try {
    const storedValue = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return storedValue === 'granted' || storedValue === 'denied' ? storedValue : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function storeAnalyticsConsent(consent: Exclude<AnalyticsConsent, 'unknown'>) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // The in-memory state still applies for this page when storage is unavailable.
  }
}

function initializeGoogleAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag() {
      window.dataLayer?.push(arguments);
    };

  if (window.__aixentrottGaInitialized) {
    return;
  }

  window.gtag('consent', 'default', { analytics_storage: 'denied' });
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
  window.__aixentrottGaInitialized = true;
}

export function loadGoogleAnalytics() {
  if (readAnalyticsConsent() !== 'granted') {
    return;
  }

  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  initializeGoogleAnalytics();

  const existingScript = document.getElementById(GA_SCRIPT_ELEMENT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    return;
  }

  const script = document.createElement('script');
  script.id = GA_SCRIPT_ELEMENT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.append(script);
}

export function waitForFundingChoicesConsentData(onReady: () => void) {
  let active = true;
  let consentApiReady = false;
  let settled = false;

  const finish = () => {
    if (!active || settled) {
      return;
    }
    settled = true;
    onReady();
  };

  const queue = getGoogleFcQueue();
  queue.push({
    CONSENT_API_READY: () => {
      consentApiReady = true;
    },
  });
  queue.push({ CONSENT_DATA_READY: finish });

  const fallbackTimer = window.setTimeout(() => {
    if (!consentApiReady) {
      finish();
    }
  }, FUNDING_CHOICES_FALLBACK_MS);

  return () => {
    active = false;
    window.clearTimeout(fallbackTimer);
  };
}

export function openGoogleAdPrivacySettings(timeoutMs = 5000) {
  return new Promise<boolean>((resolve) => {
    let settled = false;
    let timeoutId = 0;

    const finish = (opened: boolean) => {
      if (settled) {
        return;
      }
      settled = true;
      window.clearTimeout(timeoutId);
      resolve(opened);
    };

    timeoutId = window.setTimeout(() => finish(false), timeoutMs);
    getGoogleFcQueue().push({
      CONSENT_API_READY: () => {
        if (typeof window.googlefc?.showRevocationMessage !== 'function') {
          finish(false);
          return;
        }
        window.googlefc.showRevocationMessage();
        finish(true);
      },
    });
  });
}

export function openPrivacySettings() {
  window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS_EVENT));
}

function deleteCookie(name: string, domain?: string) {
  const domainAttribute = domain ? `; domain=${domain}` : '';
  document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
}

export function deleteGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  const hostName = window.location.hostname;
  const domainCandidates = hostName.endsWith('aixentrott.fr') ? [hostName, '.aixentrott.fr'] : [hostName];

  cookieNames.forEach((name) => {
    deleteCookie(name);
    domainCandidates.forEach((domain) => deleteCookie(name, domain));
  });
}

export function revokeAnalyticsConsent() {
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  storeAnalyticsConsent('denied');
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  deleteGoogleAnalyticsCookies();
}
