import { useEffect, useState } from 'react';
import { applyPwaUpdate } from '../lib/pwa-registration';

export function usePwaStatus() {
  const [isOffline, setIsOffline] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateConnectivity = () => setIsOffline(!window.navigator.onLine);
    const handleUpdateReady = () => setUpdateReady(true);

    updateConnectivity();
    window.addEventListener('online', updateConnectivity);
    window.addEventListener('offline', updateConnectivity);
    window.addEventListener('trott:pwa-update-ready', handleUpdateReady);

    return () => {
      window.removeEventListener('online', updateConnectivity);
      window.removeEventListener('offline', updateConnectivity);
      window.removeEventListener('trott:pwa-update-ready', handleUpdateReady);
    };
  }, []);

  async function installUpdate() {
    await applyPwaUpdate();
  }

  return {
    isOffline,
    updateReady,
    installUpdate,
  };
}
