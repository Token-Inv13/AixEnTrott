import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsPublicApiKey, GOOGLE_MAPS_PROVIDER_OPTIONS } from '../lib/google-maps-config';
import { createCustomRouteOrigin, type RouteOrigin } from '../lib/user-location';

function RouteOriginSearchInner({
  onSelect,
  embedded = false,
}: {
  onSelect: (origin: RouteOrigin) => void;
  embedded?: boolean;
}) {
  const placesLibrary = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onSelectRef = useRef(onSelect);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!placesLibrary || !inputRef.current || autocompleteRef.current || typeof google === 'undefined' || !google.maps.places?.Autocomplete) {
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'fr' },
      fields: ['formatted_address', 'geometry', 'name'],
      types: ['geocode', 'establishment'],
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const latitude = place.geometry?.location?.lat();
      const longitude = place.geometry?.location?.lng();

      if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        setMessage('Selection Google Maps incomplete. Reessayez.');
        return;
      }

      const nextOrigin = createCustomRouteOrigin(
        place.formatted_address || place.name || inputRef.current?.value || 'Depart personnalise',
        latitude,
        longitude,
      );

      onSelectRef.current(nextOrigin);
      setMessage(`Depart actif : ${nextOrigin.label}`);
    });

    autocompleteRef.current = autocomplete;

    return () => {
      listener.remove();
      autocompleteRef.current = null;
    };
  }, [placesLibrary]);

  const content = (
    <>
      {embedded ? <p className="text-sm text-slate-600">Adresse, village, gare ou parking de depart.</p> : null}
      <div className={embedded ? 'mt-3' : 'mt-3'}>
        <input
          ref={inputRef}
          type="text"
          autoComplete="off"
          placeholder="Ex. Gare d'Aix TGV, Cassis, Pertuis..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/20"
        />
      </div>
      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </>
  );

  if (embedded) {
    return <div>{content}</div>;
  }

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-950">Depart personnalise</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Adresse, village, gare ou point de depart. Le choix est applique des que vous selectionnez une suggestion.
      </p>
      {content}
    </div>
  );
}

export function RouteOriginSearch({
  onSelect,
  embedded = false,
}: {
  onSelect: (origin: RouteOrigin) => void;
  embedded?: boolean;
}) {
  const apiKey = getGoogleMapsPublicApiKey();

  if (!apiKey) {
    return null;
  }

  return (
    <APIProvider apiKey={apiKey} {...GOOGLE_MAPS_PROVIDER_OPTIONS}>
      <RouteOriginSearchInner onSelect={onSelect} embedded={embedded} />
    </APIProvider>
  );
}
