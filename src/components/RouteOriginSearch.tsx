import { APIProvider } from '@vis.gl/react-google-maps';
import { useEffect, useRef, useState } from 'react';
import { chargingPoints } from '../data/chargingPoints';
import { spots } from '../data/spots';
import { getGoogleMapsPublicApiKey, GOOGLE_MAPS_PROVIDER_OPTIONS } from '../lib/google-maps-config';
import { createCustomRouteOrigin, type RouteOrigin } from '../lib/user-location';

type AutocompleteSessionTokenLike = object;

type PlaceLike = {
  displayName?: string;
  formattedAddress?: string;
  location?: {
    lat: () => number;
    lng: () => number;
  };
  fetchFields: (options: { fields: string[] }) => Promise<void>;
};

type PlacePredictionLike = {
  text?: { text?: string };
  toPlace: () => PlaceLike;
};

type AutocompleteSuggestionLike = {
  placePrediction: PlacePredictionLike;
};

type PlacesLibraryLike = {
  AutocompleteSessionToken: new () => AutocompleteSessionTokenLike;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: {
      input: string;
      includedRegionCodes?: string[];
      sessionToken?: AutocompleteSessionTokenLike;
    }) => Promise<{ suggestions?: AutocompleteSuggestionLike[] }>;
  };
};

type SuggestionItem = {
  id: string;
  label: string;
  placePrediction: PlacePredictionLike;
};

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function resolveLocalOriginFallback(query: string) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return null;
  }

  const localCandidates = [
    ...spots.map((spot) => ({
      label: spot.name,
      address: spot.address,
      city: spot.area,
      latitude: spot.latitude,
      longitude: spot.longitude,
    })),
    ...chargingPoints.map((point) => ({
      label: point.name,
      address: point.address,
      city: point.city,
      latitude: point.latitude,
      longitude: point.longitude,
    })),
  ];

  const directMatch = localCandidates.find((candidate) => {
    const haystacks = [candidate.label, candidate.address, candidate.city].map(normalizeText);
    return haystacks.some((haystack) => haystack.includes(normalizedQuery) || normalizedQuery.includes(haystack));
  });

  return directMatch ?? null;
}

function RouteOriginSearchInner({
  onSelect,
  embedded = false,
}: {
  onSelect: (origin: RouteOrigin) => void;
  embedded?: boolean;
}) {
  const placesRef = useRef<PlacesLibraryLike | null>(null);
  const sessionTokenRef = useRef<AutocompleteSessionTokenLike | null>(null);
  const onSelectRef = useRef(onSelect);
  const requestIdRef = useRef(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let isMounted = true;

    async function loadPlacesLibrary() {
      if (typeof google === 'undefined') {
        return;
      }

      try {
        const placesLibrary = (await google.maps.importLibrary('places')) as unknown as PlacesLibraryLike;
        if (!isMounted) {
          return;
        }

        placesRef.current = placesLibrary;
        sessionTokenRef.current = new placesLibrary.AutocompleteSessionToken();
      } catch {
        if (isMounted) {
          setMessage("Recherche Google indisponible pour le moment. Tu peux garder Aix ou utiliser ta position.");
        }
      }
    }

    void loadPlacesLibrary();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || trimmedQuery.length < 3 || !placesRef.current) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    const currentRequestId = ++requestIdRef.current;
    const timeoutId = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setMessage(null);

        if (!sessionTokenRef.current) {
          sessionTokenRef.current = new placesRef.current!.AutocompleteSessionToken();
        }

        const result = await placesRef.current!.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: trimmedQuery,
          includedRegionCodes: ['fr'],
          sessionToken: sessionTokenRef.current,
        });

        if (requestIdRef.current !== currentRequestId) {
          return;
        }

        const nextSuggestions = (result.suggestions ?? []).slice(0, 6).map((suggestion, index) => ({
          id: `${trimmedQuery}-${index}`,
          label: suggestion.placePrediction.text?.text ?? `Suggestion ${index + 1}`,
          placePrediction: suggestion.placePrediction,
        }));

        setSuggestions(nextSuggestions);
      } catch {
        if (requestIdRef.current === currentRequestId) {
          setSuggestions([]);
          setMessage("Recherche Google indisponible pour le moment. Tu peux garder Aix ou utiliser ta position.");
        }
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  async function handleSuggestionSelect(suggestion: SuggestionItem) {
    try {
      const place = suggestion.placePrediction.toPlace();
      await applyResolvedPlace(place, suggestion.label);
    } catch {
      setMessage('Selection Google Maps incomplete. Reessayez.');
    }
  }

  async function applyResolvedPlace(place: PlaceLike, fallbackLabel: string) {
    await place.fetchFields({
      fields: ['displayName', 'formattedAddress', 'location'],
    });

    const latitude = place.location?.lat();
    const longitude = place.location?.lng();

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      setMessage('Selection Google Maps incomplete. Reessayez.');
      return;
    }

    const nextOrigin = createCustomRouteOrigin(
      place.formattedAddress || place.displayName || fallbackLabel || 'Depart personnalise',
      latitude,
      longitude,
    );

    setQuery(nextOrigin.label);
    setSuggestions([]);
    setMessage(`Depart actif : ${nextOrigin.label}`);
    onSelectRef.current(nextOrigin);

    if (placesRef.current) {
      sessionTokenRef.current = new placesRef.current.AutocompleteSessionToken();
    }
  }

  async function handleManualSubmit() {
    const trimmedQuery = query.trim();
    const normalizedQuery =
      /france/i.test(trimmedQuery) || trimmedQuery.includes(',') ? trimmedQuery : `${trimmedQuery}, France`;
    if (trimmedQuery.length < 3 || typeof google === 'undefined') {
      setMessage('Saisis une adresse plus precise pour recalculer le depart.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage(null);
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        address: normalizedQuery,
        region: 'fr',
      });
      const result = response.results?.[0];
      const latitude = result?.geometry.location?.lat();
      const longitude = result?.geometry.location?.lng();

      if (!result || typeof latitude !== 'number' || typeof longitude !== 'number') {
        const fallbackCandidate = resolveLocalOriginFallback(trimmedQuery);
        if (fallbackCandidate) {
          const nextOrigin = createCustomRouteOrigin(fallbackCandidate.label, fallbackCandidate.latitude, fallbackCandidate.longitude);
          setQuery(nextOrigin.label);
          setSuggestions([]);
          setMessage(`Depart actif : ${nextOrigin.label} (repere local indicatif)`);
          onSelectRef.current(nextOrigin);
          return;
        }

        setMessage("Adresse non trouvee. Essaie un lieu plus precis, une gare ou un parking.");
        return;
      }

      const nextOrigin = createCustomRouteOrigin(result.formatted_address || trimmedQuery, latitude, longitude);
      setQuery(nextOrigin.label);
      setSuggestions([]);
      setMessage(`Depart actif : ${nextOrigin.label}`);
      onSelectRef.current(nextOrigin);
    } catch {
      const fallbackCandidate = resolveLocalOriginFallback(trimmedQuery);
      if (fallbackCandidate) {
        const nextOrigin = createCustomRouteOrigin(fallbackCandidate.label, fallbackCandidate.latitude, fallbackCandidate.longitude);
        setQuery(nextOrigin.label);
        setSuggestions([]);
        setMessage(`Depart actif : ${nextOrigin.label} (repere local indicatif)`);
        onSelectRef.current(nextOrigin);
        return;
      }

      setMessage("Adresse non trouvee. Essaie un lieu plus precis, une gare ou un parking.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const content = (
    <>
      {embedded ? <p className="text-sm text-slate-600">Adresse, village, gare ou parking de depart.</p> : null}
      <div className="mt-3">
        <input
          type="text"
          value={query}
          autoComplete="off"
          placeholder="Ex. Gare d'Aix TGV, Cassis, Pertuis..."
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void handleManualSubmit();
            }
          }}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky focus:ring-2 focus:ring-sky/20"
        />
        {isLoading ? <p className="mt-2 text-xs text-slate-500">Suggestions Google en cours...</p> : null}
        {suggestions.length ? (
          <div className="mt-2 rounded-2xl border border-slate-200 bg-white shadow-soft">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => {
                  void handleSuggestionSelect(suggestion);
                }}
                className="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-sky-50"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => {
              void handleManualSubmit();
            }}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Recherche...' : 'Utiliser cette adresse'}
          </button>
        </div>
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
