import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';
import { buildGoogleMapsBikeDirectionsUrl, buildGoogleMapsSearchUrl } from './maps';

export function formatBudget(budget: Spot['budget']) {
  switch (budget) {
    case '0€':
      return '0 €';
    case '<5€':
      return '< 5 €';
    case '<10€':
      return '< 10 €';
    case 'variable':
      return 'Variable';
  }
}

export function formatRechargeStatus(status: Spot['rechargeStatus']) {
  switch (status) {
    case 'confirmed':
      return 'Recharge confirmee';
    case 'nearby':
      return 'Recharge possible';
    case 'verify':
      return 'Recharge a verifier';
    case 'none':
      return 'Aucune connue';
  }
}

export function formatCompatibility(point: ChargingPoint['compatibility']) {
  switch (point) {
    case 'confirmed-220v':
      return 'Compatible 220V confirmee';
    case 'possible-220v':
      return 'Prise 220V possible, a verifier';
    case 'car-only':
      return 'Borne voiture uniquement';
    case 'private':
      return 'Acces prive / abonnement';
    case 'verify':
      return 'A verifier avant depart';
  }
}

export function formatCyclingInfrastructureStatus(status: Spot['cyclingInfrastructure']['status']) {
  switch (status) {
    case 'good':
      return 'Bon';
    case 'partial':
      return 'Partiel';
    case 'limited':
      return 'Limite';
    case 'unknown':
      return 'A verifier';
  }
}

export function formatRoadSafetyLevel(level: Spot['roadSafety']['level']) {
  switch (level) {
    case 'easy':
      return 'Facile';
    case 'moderate':
      return 'Modere';
    case 'caution':
      return 'Prudence';
    case 'unknown':
      return 'A verifier';
  }
}

export function formatDifficulty(difficulty: Spot['difficulty']) {
  switch (difficulty) {
    case 'facile':
      return 'Facile';
    case 'intermédiaire':
      return 'Intermediaire';
    case 'préparée':
      return 'Preparee';
  }
}

export function formatRouteType(routeType: Spot['routeType']) {
  switch (routeType) {
    case 'urbain':
      return 'Urbain';
    case 'nature':
      return 'Nature';
    case 'village':
      return 'Village';
    case 'littoral':
      return 'Littoral';
    case 'mixte':
      return 'Mixte';
  }
}

export function destinationShortLabel(address: string) {
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length) {
    return parts[parts.length - 1];
  }
  const slashParts = address.split('/').map((part) => part.trim()).filter(Boolean);
  if (slashParts.length) {
    return slashParts[slashParts.length - 1];
  }
  return address;
}

export function mapsSearchUrl(latitude: number, longitude: number) {
  return buildGoogleMapsSearchUrl(latitude, longitude);
}

export function mapsBikeDirectionsUrl(latitude: number, longitude: number) {
  return buildGoogleMapsBikeDirectionsUrl(latitude, longitude);
}

export function formatAccess(access: ChargingPoint['access']) {
  switch (access) {
    case 'public':
      return 'Public';
    case 'private':
      return 'Prive';
    case 'subscription':
      return 'Abonnement';
    case 'unknown':
      return 'Inconnu';
  }
}

export function autonomyRecommendation(distanceKm: number) {
  if (distanceKm <= 3) return "30 km d'autonomie suffisent dans la plupart des cas";
  if (distanceKm <= 7) return "35 a 40 km d'autonomie recommandes";
  if (distanceKm <= 15) return "45 a 55 km d'autonomie conseilles";
  if (distanceKm <= 30) return '60 km ou plus avec marge de securite';
  return 'Sortie a traiter comme une journee longue avec retour planifie';
}

export function getDistanceBand(distanceKm: number) {
  if (distanceKm <= 3) return '0–3 km';
  if (distanceKm <= 7) return '3–7 km';
  if (distanceKm <= 15) return '7–15 km';
  if (distanceKm <= 30) return '15–30 km';
  return '+30 km';
}

export function areaLabel(area: Spot['area']) {
  switch (area) {
    case 'aix':
      return 'Aix';
    case 'pays-aix':
      return "Pays d'Aix";
    case 'provence':
      return 'Provence';
    case 'marseille':
      return 'Marseille';
    case 'luberon':
      return 'Luberon';
    case 'cote-bleue':
      return 'Cote Bleue';
  }
}

export function categoryLabel(category: Spot['category']) {
  switch (category) {
    case 'soir':
      return 'Soir';
    case 'weekend':
      return 'Week-end';
    case 'journee':
      return 'Journee';
  }
}
