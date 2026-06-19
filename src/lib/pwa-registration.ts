const PWA_UPDATE_EVENT = 'trott:pwa-update-ready';

declare global {
  interface WindowEventMap {
    'trott:pwa-update-ready': CustomEvent<{ source: 'waiting-worker' | 'new-worker' }>;
  }
}

function emitPwaUpdateReady(source: 'waiting-worker' | 'new-worker') {
  window.dispatchEvent(new CustomEvent(PWA_UPDATE_EVENT, { detail: { source } }));
}

export function applyPwaUpdate() {
  return navigator.serviceWorker.getRegistration().then((registration) => {
    registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
  });
}

export function registerPwaServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !import.meta.env.PROD) {
    return;
  }

  let hasReloadedForController = false;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (registration.waiting) {
          emitPwaUpdateReady('waiting-worker');
        }

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) {
            return;
          }

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              emitPwaUpdateReady('new-worker');
            }
          });
        });

        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (hasReloadedForController) {
            return;
          }

          hasReloadedForController = true;
          window.location.reload();
        });
      })
      .catch(() => {
        // Keep the app usable even if registration fails.
      });
  });
}
