import type { Spot } from '../data/spots';

export type BatteryProfileId = 'compact-20' | 'city-30' | 'touring-40' | 'endurance-60' | 'long-range-80';

export type BatteryProfile = {
  id: BatteryProfileId;
  label: string;
  nominalRangeKm: number;
  reserveRatio: number;
  note: string;
};

export type BatteryTripAssessment = {
  profile: BatteryProfile;
  oneWayKm: number;
  roundTripKm: number;
  usableRangeKm: number;
  reserveKm: number;
  recommendedNominalKm: number;
  bufferKm: number;
  label:
    | 'Compatible avec marge'
    | 'Possible mais limite'
    | 'A eviter sans recharge ou retour alternatif'
    | 'Prevoir train / voiture / recharge';
  status: 'comfortable' | 'tight' | 'recharge-needed' | 'alternative-needed';
  note: string;
};

export const batteryProfiles: BatteryProfile[] = [
  {
    id: 'compact-20',
    label: 'Compact 20 km',
    nominalRangeKm: 20,
    reserveRatio: 0.3,
    note: 'Petite batterie urbaine. Marge prudente recommandee.',
  },
  {
    id: 'city-30',
    label: 'Ville 30 km',
    nominalRangeKm: 30,
    reserveRatio: 0.25,
    note: 'Profil courant pour une sortie courte a moyenne.',
  },
  {
    id: 'touring-40',
    label: 'Touring 40 km',
    nominalRangeKm: 40,
    reserveRatio: 0.22,
    note: 'Bon compromis pour Aix et proche peripherie.',
  },
  {
    id: 'endurance-60',
    label: 'Endurance 60 km',
    nominalRangeKm: 60,
    reserveRatio: 0.2,
    note: 'Plus adapte aux sorties preparees ou vallonnees.',
  },
  {
    id: 'long-range-80',
    label: 'Long range 80 km',
    nominalRangeKm: 80,
    reserveRatio: 0.18,
    note: 'Reste indicatif: vent, relief et charge utile changent beaucoup le resultat.',
  },
];

export function getBatteryProfile(profileId: BatteryProfileId) {
  return batteryProfiles.find((profile) => profile.id === profileId) ?? batteryProfiles[2];
}

export function findBatteryProfileByNominalRange(nominalRangeKm: number) {
  return batteryProfiles.find((profile) => profile.nominalRangeKm === nominalRangeKm) ?? null;
}

export function getUsableRangeKm(profile: BatteryProfile) {
  return Number((profile.nominalRangeKm * (1 - profile.reserveRatio)).toFixed(1));
}

export function getReserveKm(profile: BatteryProfile) {
  return Number((profile.nominalRangeKm * profile.reserveRatio).toFixed(1));
}

export function getRecommendedNominalRangeKm(oneWayKm: number, reserveRatio = 0.2) {
  return Number(((oneWayKm * 2) / Math.max(0.1, 1 - reserveRatio)).toFixed(1));
}

export function assessTripForBatteryProfile(
  oneWayKm: number,
  profile: BatteryProfile,
  rechargeStatus: Spot['rechargeStatus'],
): BatteryTripAssessment {
  const roundTripKm = Number((oneWayKm * 2).toFixed(1));
  const usableRangeKm = getUsableRangeKm(profile);
  const reserveKm = getReserveKm(profile);
  const recommendedNominalKm = getRecommendedNominalRangeKm(oneWayKm, profile.reserveRatio);
  const bufferKm = Number((usableRangeKm - roundTripKm).toFixed(1));
  const hasRechargeLead = rechargeStatus === 'confirmed' || rechargeStatus === 'nearby' || rechargeStatus === 'verify';

  if (bufferKm >= Math.max(3, roundTripKm * 0.1)) {
    return {
      profile,
      oneWayKm,
      roundTripKm,
      usableRangeKm,
      reserveKm,
      recommendedNominalKm,
      bufferKm,
      label: 'Compatible avec marge',
      status: 'comfortable',
      note: "Estimation aller-retour couverte avec marge de securite. Relief, vent et revetement restent a verifier.",
    };
  }

  if (bufferKm >= 0) {
    return {
      profile,
      oneWayKm,
      roundTripKm,
      usableRangeKm,
      reserveKm,
      recommendedNominalKm,
      bufferKm,
      label: 'Possible mais limite',
      status: 'tight',
      note: "Estimation jouable mais serree. Une recharge ou un retour plus court reste preferable.",
    };
  }

  if (hasRechargeLead && bufferKm >= -Math.max(5, oneWayKm * 0.35)) {
    return {
      profile,
      oneWayKm,
      roundTripKm,
      usableRangeKm,
      reserveKm,
      recommendedNominalKm,
      bufferKm,
      label: 'A eviter sans recharge ou retour alternatif',
      status: 'recharge-needed',
      note:
        rechargeStatus === 'confirmed'
          ? 'Estimation trop courte sans pause recharge. Une solution connue peut rendre la sortie jouable.'
          : 'Estimation trop courte sans verification recharge. Controle la prise et garde un plan B.',
    };
  }

  return {
    profile,
    oneWayKm,
    roundTripKm,
    usableRangeKm,
    reserveKm,
    recommendedNominalKm,
    bufferKm,
    label: 'Prevoir train / voiture / recharge',
    status: 'alternative-needed',
    note: "Le profil batterie reste trop court pour l'aller-retour indicatif. Retour alternatif ou recharge quasi obligatoire.",
  };
}

export function getTripConstraintLabels(spot: Spot, oneWayKm: number) {
  const labels: string[] = [];

  if (oneWayKm > 25) {
    labels.push('Sortie longue');
  }
  if (spot.roadSafety.level === 'caution') {
    labels.push('Portions a surveiller');
  }
  if (spot.cyclingInfrastructure.status === 'limited') {
    labels.push('Amenagements limites');
  }
  if (spot.cyclingInfrastructure.status === 'partial') {
    labels.push('Amenagements partiels');
  }
  if (spot.rechargeStatus === 'confirmed') {
    labels.push('Recharge connue');
  } else if (spot.rechargeStatus === 'nearby') {
    labels.push('Recharge proche');
  } else if (spot.rechargeStatus === 'verify') {
    labels.push('Recharge a verifier');
  }

  return labels.slice(0, 4);
}
