import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getDefaultRouteOrigin, readStoredRouteOrigin, requestBrowserLocation, storeRouteOrigin, type RouteOrigin } from '../lib/user-location';

type RouteOriginContextValue = {
  origin: RouteOrigin;
  isLocating: boolean;
  statusMessage: string | null;
  useDefaultOrigin: () => void;
  useUserLocation: () => Promise<boolean>;
};

const RouteOriginContext = createContext<RouteOriginContextValue | null>(null);

export function RouteOriginProvider({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState<RouteOrigin>(() => readStoredRouteOrigin() ?? getDefaultRouteOrigin());
  const [isLocating, setIsLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    storeRouteOrigin(origin);
  }, [origin]);

  const value = useMemo<RouteOriginContextValue>(
    () => ({
      origin,
      isLocating,
      statusMessage,
      useDefaultOrigin: () => {
        setOrigin(getDefaultRouteOrigin());
        setStatusMessage('Distances calculées depuis Aix-en-Provence.');
      },
      useUserLocation: async () => {
        setIsLocating(true);
        setStatusMessage(null);

        try {
          const location = await requestBrowserLocation();
          setOrigin(location);
          setStatusMessage('Distances calculées depuis votre position.');
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Localisation indisponible.';
          setOrigin(getDefaultRouteOrigin());
          setStatusMessage(
            message === 'Localisation refusée.'
              ? 'Localisation refusée. Distances calculées depuis Aix-en-Provence.'
              : 'Localisation indisponible. Distances calculées depuis Aix-en-Provence.',
          );
          return false;
        } finally {
          setIsLocating(false);
        }
      },
    }),
    [isLocating, origin, statusMessage],
  );

  return <RouteOriginContext.Provider value={value}>{children}</RouteOriginContext.Provider>;
}

export function useRouteOrigin() {
  const context = useContext(RouteOriginContext);
  if (!context) {
    throw new Error('useRouteOrigin must be used within RouteOriginProvider');
  }
  return context;
}
