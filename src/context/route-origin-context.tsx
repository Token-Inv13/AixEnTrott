import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getDefaultRouteOrigin, readStoredRouteOrigin, requestBrowserLocation, storeRouteOrigin, type RouteOrigin } from '../lib/user-location';

type RouteOriginContextValue = {
  origin: RouteOrigin;
  isLocating: boolean;
  statusMessage: string | null;
  useCustomOrigin: (origin: RouteOrigin) => void;
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
      useCustomOrigin: (nextOrigin) => {
        setOrigin(nextOrigin);
        setStatusMessage(`Trajets calcules depuis ${nextOrigin.label}.`);
      },
      useDefaultOrigin: () => {
        setOrigin(getDefaultRouteOrigin());
        setStatusMessage('Trajets calcules depuis Aix-en-Provence.');
      },
      useUserLocation: async () => {
        setIsLocating(true);
        setStatusMessage(null);

        try {
          const location = await requestBrowserLocation();
          setOrigin(location);
          setStatusMessage('Trajets calcules depuis votre position.');
          return true;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Localisation indisponible.';
          setOrigin(getDefaultRouteOrigin());
          setStatusMessage(
            message === 'Localisation refusee.'
              ? 'Localisation refusee. Trajets calcules depuis Aix-en-Provence.'
              : 'Localisation indisponible. Trajets calcules depuis Aix-en-Provence.',
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
