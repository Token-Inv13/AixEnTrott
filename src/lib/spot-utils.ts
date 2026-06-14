import type { ChargingPoint } from '../data/chargingPoints';
import type { Spot } from '../data/spots';

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
      return 'Recharge confirmée';
    case 'nearby':
      return 'Recharge possible';
    case 'verify':
      return 'Recharge à vérifier';
    case 'none':
      return 'Aucune connue';
  }
}

export function formatCompatibility(point: ChargingPoint['compatibility']) {
  switch (point) {
    case 'confirmed-220v':
      return 'Compatible 220V confirmée';
    case 'possible-220v':
      return 'Prise 220V possible, à vérifier';
    case 'car-only':
      return 'Borne voiture uniquement';
    case 'private':
      return 'Accès privé / abonnement';
    case 'verify':
      return 'À vérifier avant départ';
  }
}

export function formatAccess(access: ChargingPoint['access']) {
  switch (access) {
    case 'public':
      return 'Public';
    case 'private':
      return 'Privé';
    case 'subscription':
      return 'Abonnement';
    case 'unknown':
      return 'Inconnu';
  }
}

export function autonomyRecommendation(distanceKm: number) {
  if (distanceKm <= 3) return '30 km d’autonomie suffisent dans la plupart des cas';
  if (distanceKm <= 7) return '35 à 40 km d’autonomie recommandés';
  if (distanceKm <= 15) return '45 à 55 km d’autonomie conseillés';
  if (distanceKm <= 30) return '60 km ou plus avec marge de sécurité';
  return 'Sortie à traiter comme une journée longue avec retour planifié';
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
      return 'Pays d’Aix';
    case 'provence':
      return 'Provence';
    case 'marseille':
      return 'Marseille';
    case 'luberon':
      return 'Luberon';
    case 'cote-bleue':
      return 'Côte Bleue';
  }
}

export function categoryLabel(category: Spot['category']) {
  switch (category) {
    case 'soir':
      return 'Soir';
    case 'weekend':
      return 'Week-end';
    case 'journee':
      return 'Journée';
  }
}
