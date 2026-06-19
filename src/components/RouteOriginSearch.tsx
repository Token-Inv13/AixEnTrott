import { APIProvider, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { getGoogleMapsPublicApiKey, GOOGLE_MAPS_PROVIDER_OPTIONS } from '../lib/google-maps-config';
import { createCustomRouteOrigin, type RouteOrigin } from '../lib/user-location';

function RouteOriginSearchInner({
  onSelect,
}: {
  onSelect: (origin: RouteOrigin) => void;
}) {
  const placesLibrary = useMapsLibrary('places');
  const widgetHostRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!placesLibrary || !widgetHostRef.current || widgetRef.current) {
      return;
    }

    const widget = new google.maps.places.PlaceAutocompleteElement({
      includedRegionCodes: ['fr'],
      requestedLanguage: 'fr',
    });

    widget.setAttribute('name', 'route-origin');
    widget.style.display = 'block';
    widget.style.width = '100%';
    widget.style.borderRadius = '1rem';
    widget.style.background = '#ffffff';

    const handleSelect = async (event: Event) => {
      const selectEvent = event as google.maps.places.PlacePredictionSelectEvent;
      const place = selectEvent.placePrediction.toPlace();
      await place.fetchFields({
        fields: ['displayName', 'formattedAddress', 'location'],
      });

      if (!place.location) {
        setMessage('Selection Google Maps incomplete. Reessayez.');
        return;
      }

      const nextOrigin = createCustomRouteOrigin(
        place.formattedAddress || place.displayName || 'Depart personnalise',
        place.location.lat(),
        place.location.lng(),
      );

      onSelect(nextOrigin);
      setMessage(`Depart actif : ${nextOrigin.label}`);
    };

    widget.addEventListener('gmp-select', handleSelect);
    widgetHostRef.current.replaceChildren(widget);
    widgetRef.current = widget;

    return () => {
      widget.removeEventListener('gmp-select', handleSelect);
      widget.remove();
      widgetRef.current = null;
      widgetHostRef.current?.replaceChildren();
    };
  }, [onSelect, placesLibrary]);

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-950">Depart personnalise</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Adresse, village, gare ou point de depart. Le choix est applique des que vous selectionnez une suggestion.
      </p>
      <div ref={widgetHostRef} className="mt-3 min-h-14" />
      {message ? <p className="mt-3 text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}

export function RouteOriginSearch({
  onSelect,
}: {
  onSelect: (origin: RouteOrigin) => void;
}) {
  const apiKey = getGoogleMapsPublicApiKey();

  if (!apiKey) {
    return null;
  }

  return (
    <APIProvider apiKey={apiKey} {...GOOGLE_MAPS_PROVIDER_OPTIONS}>
      <RouteOriginSearchInner onSelect={onSelect} />
    </APIProvider>
  );
}
