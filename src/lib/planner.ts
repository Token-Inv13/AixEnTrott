import type { Spot } from '../data/spots';

export type PlannerTripType = 'quick' | 'evening' | 'weekend' | 'full-day';
export type PlannerMood = 'calme' | 'nature' | 'village' | 'patrimoine' | 'mer' | 'recharge';
export type PlannerPrudence = 'easy-only' | 'intermediate-ok' | 'prepared-ok';

export type PlannerPreferences = {
  autonomyKm: number;
  tripType: PlannerTripType;
  primaryMood: PlannerMood;
  prudence: PlannerPrudence;
};

export type AutonomyVerdict = {
  label: 'Compatible' | 'Limite' | 'Préparée' | 'Trop longue sans alternative';
  detail: string;
  status: 'compatible' | 'limit' | 'prepared' | 'too-long';
};

export type PlannerRecommendation = {
  spot: Spot;
  score: number;
  verdict: AutonomyVerdict;
  reasons: string[];
};

export const tripTypeOptions: Array<{ value: PlannerTripType; label: string }> = [
  { value: 'quick', label: 'Sortie rapide' },
  { value: 'evening', label: 'Sortie du soir' },
  { value: 'weekend', label: 'Sortie week-end' },
  { value: 'full-day', label: 'Journée complète' },
];

export const moodOptions: Array<{ value: PlannerMood; label: string }> = [
  { value: 'calme', label: 'Calme' },
  { value: 'nature', label: 'Nature' },
  { value: 'village', label: 'Village' },
  { value: 'patrimoine', label: 'Patrimoine' },
  { value: 'mer', label: 'Mer' },
  { value: 'recharge', label: 'Recharge possible' },
];

export const prudenceOptions: Array<{ value: PlannerPrudence; label: string }> = [
  { value: 'easy-only', label: 'Facile uniquement' },
  { value: 'intermediate-ok', label: 'Intermédiaire accepté' },
  { value: 'prepared-ok', label: 'Sortie préparée acceptée' },
];

export function estimateRoundTripKm(spot: Spot) {
  return spot.distanceKmFromAix * 2;
}

export function estimateRequiredAutonomyKm(spot: Spot) {
  return estimateRoundTripKm(spot) * 1.2;
}

export function getAutonomyVerdictForDistance(distanceKmFromAix: number, autonomyKm: number): AutonomyVerdict {
  const roundTrip = distanceKmFromAix * 2;
  const required = roundTrip * 1.2;

  if (autonomyKm >= required) {
    return {
      label: 'Compatible',
      status: 'compatible',
      detail: 'Estimation compatible avec marge de sécurité.',
    };
  }

  if (autonomyKm >= roundTrip) {
    return {
      label: 'Limite',
      status: 'limit',
      detail: 'Possible selon l’estimation, mais la marge de sécurité reste réduite.',
    };
  }

  if (autonomyKm >= roundTrip * 0.75) {
    return {
      label: 'Préparée',
      status: 'prepared',
      detail: 'À éviter sans recharge ou retour alternatif; l’estimation est trop serrée.',
    };
  }

  return {
    label: 'Trop longue sans alternative',
    status: 'too-long',
    detail: 'Prévoir train / voiture / recharge: l’estimation est trop courte pour partir serein.',
  };
}

export function getAutonomyVerdict(spot: Spot, autonomyKm: number): AutonomyVerdict {
  return getAutonomyVerdictForDistance(spot.distanceKmFromAix, autonomyKm);
}

export function getTripTypeLabel(tripType: PlannerTripType) {
  return tripTypeOptions.find((item) => item.value === tripType)?.label ?? 'Sortie';
}

export function getMoodLabel(mood: PlannerMood) {
  return moodOptions.find((item) => item.value === mood)?.label ?? mood;
}

export function getPrudenceLabel(prudence: PlannerPrudence) {
  return prudenceOptions.find((item) => item.value === prudence)?.label ?? prudence;
}

function matchesTripType(spot: Spot, tripType: PlannerTripType, distanceKmFromAix: number) {
  switch (tripType) {
    case 'quick':
      return distanceKmFromAix <= 7 && (spot.category === 'soir' || spot.category === 'weekend');
    case 'evening':
      return spot.category === 'soir';
    case 'weekend':
      return spot.category === 'weekend';
    case 'full-day':
      return spot.category === 'journee';
  }
}

function matchesMood(spot: Spot, primaryMood: PlannerMood) {
  if (primaryMood === 'recharge') {
    return spot.rechargeStatus !== 'none';
  }
  return spot.moods.includes(primaryMood);
}

function matchesPrudence(spot: Spot, prudence: PlannerPrudence) {
  switch (prudence) {
    case 'easy-only':
      return spot.difficulty === 'facile';
    case 'intermediate-ok':
      return spot.difficulty === 'facile' || spot.difficulty === 'intermédiaire';
    case 'prepared-ok':
      return true;
  }
}

export function scoreSpotForPlanner(spot: Spot, preferences: PlannerPreferences, effectiveDistanceKm?: number) {
  const reasons: string[] = [];
  let score = 0;
  const distanceKmFromAix = effectiveDistanceKm ?? spot.distanceKmFromAix;
  const roundTripKm = distanceKmFromAix * 2;
  const requiredAutonomyKm = roundTripKm * 1.2;

  if (matchesTripType(spot, preferences.tripType, distanceKmFromAix)) {
    score += 35;
    reasons.push(`Format compatible avec "${getTripTypeLabel(preferences.tripType).toLowerCase()}".`);
  } else {
    score -= 10;
  }

  if (matchesMood(spot, preferences.primaryMood)) {
    score += 25;
    reasons.push(`Ambiance alignée sur "${getMoodLabel(preferences.primaryMood).toLowerCase()}".`);
  } else {
    score -= 5;
  }

  if (matchesPrudence(spot, preferences.prudence)) {
    score += 20;
    reasons.push(`Niveau de prudence compatible avec "${getPrudenceLabel(preferences.prudence).toLowerCase()}".`);
  } else {
    score -= 20;
  }

  const verdict = getAutonomyVerdictForDistance(distanceKmFromAix, preferences.autonomyKm);
  switch (verdict.status) {
    case 'compatible':
      score += 25;
      reasons.push('Autonomie compatible avec marge de sécurité.');
      break;
    case 'limit':
      score += 10;
      reasons.push('Autonomie possible mais limite.');
      break;
    case 'prepared':
      score -= 5;
      reasons.push('Sortie à préparer avec une marge plus confortable.');
      break;
    case 'too-long':
      score -= 20;
      reasons.push('Autonomie trop courte sans alternative.');
      break;
  }

  if (distanceKmFromAix > 30) {
    score -= 10;
    reasons.push('Sortie longue: prévoir train, voiture, recharge ou retour alternatif.');
  }

  if (preferences.autonomyKm >= requiredAutonomyKm) {
    score += 2;
  }

  if (spot.rechargeStatus === 'confirmed') {
    score += 10;
    reasons.push('Recharge connue à proximité.');
  } else if (spot.rechargeStatus === 'nearby') {
    score += 5;
    reasons.push('Recharge possible mais à vérifier.');
  } else if (spot.rechargeStatus === 'verify') {
    reasons.push('Recharge à vérifier avant le départ.');
  }

  return { score, verdict, reasons };
}

export function getPlannerRecommendations(
  spots: Spot[],
  preferences: PlannerPreferences,
  limit = 8,
  routeDistanceById?: Record<string, number>,
): PlannerRecommendation[] {
  return spots
    .map((spot) => {
      const effectiveDistance = routeDistanceById?.[spot.id];
      const { score, verdict, reasons } = scoreSpotForPlanner(spot, preferences, effectiveDistance);
      return { spot, score, verdict, reasons };
    })
    .sort((a, b) => b.score - a.score || a.spot.distanceKmFromAix - b.spot.distanceKmFromAix)
    .slice(0, limit);
}

export function getPlannerShortWarning(spot: Spot) {
  if (spot.distanceKmFromAix > 30) {
    return 'Sortie longue : prévoir train, voiture, recharge ou retour alternatif.';
  }
  return spot.isSimpleRide ? 'Sortie simple.' : 'Prévoir une marge.';
}
