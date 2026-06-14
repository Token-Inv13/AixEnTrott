export type Spot = {
  id: string;
  name: string;
  category: 'soir' | 'weekend' | 'journee';
  area: 'aix' | 'pays-aix' | 'provence' | 'marseille' | 'luberon' | 'cote-bleue';
  distanceKmFromAix: number;
  distanceLabel: string;
  budget: '0€' | '<5€' | '<10€' | 'variable';
  duration: string;
  moods: string[];
  description: string;
  tips: string[];
  latitude: number;
  longitude: number;
  rechargeStatus: 'none' | 'nearby' | 'confirmed' | 'verify';
  address: string;
  googleMapsUrl: string;
  routeNotes: string;
  cyclingInfrastructure: {
    status: 'good' | 'partial' | 'limited' | 'unknown';
    label: string;
    notes: string;
  };
  roadSafety: {
    level: 'easy' | 'moderate' | 'caution' | 'unknown';
    notes: string;
  };
  parkingAdvice: string;
  bestTime: string;
  isSimpleRide: boolean;
  difficulty: 'facile' | 'intermédiaire' | 'préparée';
  routeType: 'urbain' | 'nature' | 'village' | 'littoral' | 'mixte';
};

type SpotInput = Omit<
  Spot,
  | 'address'
  | 'googleMapsUrl'
  | 'routeNotes'
  | 'cyclingInfrastructure'
  | 'roadSafety'
  | 'parkingAdvice'
  | 'bestTime'
  | 'isSimpleRide'
  | 'difficulty'
  | 'routeType'
>;

// TODO: verify coordinates
const rawSpots: SpotInput[] = [
  {
    id: 'promenade-de-la-torse',
    name: 'Promenade de la Torse',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 2.1,
    distanceLabel: '0–3 km',
    budget: '0€',
    duration: '45 min à 1 h 30',
    moods: ['calme', 'nature'],
    description:
      'Une sortie très simple pour rouler jusqu’au parc puis marcher au bord de l’eau, entre passerelles, végétation fraîche et ambiance posée.',
    tips: ['Parfait en fin de journée chaude.', 'Prends un petit cadenas si tu t’arrêtes longtemps.'],
    latitude: 43.5348,
    longitude: 5.4532,
    rechargeStatus: 'nearby',
  },
  {
    id: 'jardin-des-peintres',
    name: 'Jardin des Peintres',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 2.4,
    distanceLabel: '0–3 km',
    budget: '0€',
    duration: '30 min à 1 h',
    moods: ['calme', 'nature', 'patrimoine'],
    description:
      'Petit belvédère inspirant au-dessus d’Aix, idéal pour une pause courte avec vue sur Sainte-Victoire et lumière de fin de journée.',
    tips: ['Convient bien à une sortie photo.', 'Meilleur moment: golden hour.'],
    latitude: 43.523,
    longitude: 5.4429,
    rechargeStatus: 'none',
  },
  {
    id: 'parc-jourdan',
    name: 'Parc Jourdan',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 1.6,
    distanceLabel: '0–3 km',
    budget: '0€',
    duration: '30 min à 1 h 30',
    moods: ['calme', 'nature'],
    description:
      'Le parc le plus simple pour respirer un peu sans quitter la ville: allées de tilleuls, miroir d’eau et vraie pause de soirée.',
    tips: ['Bon choix pour lire ou écouter de la musique.', 'Accessible même pour une courte boucle.'],
    latitude: 43.5219,
    longitude: 5.4463,
    rechargeStatus: 'nearby',
  },
  {
    id: 'place-d-albertas-vieil-aix',
    name: "Place d’Albertas + Vieil Aix",
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 0.8,
    distanceLabel: '0–3 km',
    budget: '<10€',
    duration: '45 min à 2 h',
    moods: ['patrimoine', 'marché'],
    description:
      'Boucle patrimoniale pour flâner dans le centre ancien, passer par une place baroque et enchaîner sur une terrasse ou un petit verre.',
    tips: ['Idéal pour une sortie spontanée.', 'Reste vigilant dans les zones piétonnes.'],
    latitude: 43.5293,
    longitude: 5.4476,
    rechargeStatus: 'nearby',
  },
  {
    id: 'parc-rambot',
    name: 'Parc Rambot',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 2.8,
    distanceLabel: '0–3 km',
    budget: '0€',
    duration: '30 min à 1 h 30',
    moods: ['calme', 'nature'],
    description:
      'Parc urbain ombragé pour lever le pied, marcher sur les pelouses et faire une pause simple après une courte prise de route.',
    tips: ['Bien pour une sortie avec enfants.', 'Le cadre est calme en fin de journée.'],
    latitude: 43.5221,
    longitude: 5.4555,
    rechargeStatus: 'nearby',
  },
  {
    id: 'pavillon-de-vendome',
    name: 'Pavillon de Vendôme',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 1.1,
    distanceLabel: '0–3 km',
    budget: '0€',
    duration: '45 min à 1 h 30',
    moods: ['patrimoine', 'calme'],
    description:
      'Jardin à la française et halte patrimoniale pratique au coeur d’Aix, utile quand on veut une sortie courte mais soignée.',
    tips: ['À combiner avec une marche en centre-ville.', 'Ambiance idéale pour une soirée tranquille.'],
    latitude: 43.5291,
    longitude: 5.4505,
    rechargeStatus: 'nearby',
  },
  {
    id: 'oppidum-d-entremont',
    name: "Oppidum d’Entremont",
    category: 'weekend',
    area: 'aix',
    distanceKmFromAix: 4.8,
    distanceLabel: '3–7 km',
    budget: '<5€',
    duration: '1 h à 2 h',
    moods: ['patrimoine', 'nature'],
    description:
      'Site archéologique au nord d’Aix pour changer d’échelle, marcher un peu et voir autre chose que les parcs du centre.',
    tips: ['Prévois de l’eau et un peu de marche.', 'Très bien pour une sortie du week-end.'],
    latitude: 43.5599,
    longitude: 5.4617,
    rechargeStatus: 'none',
  },
  {
    id: 'barrage-de-bimont',
    name: 'Barrage de Bimont',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 11.2,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['nature', 'calme'],
    description:
      'La sortie nature de référence: route plus longue, vue sur Sainte-Victoire et vraie sensation de respiration loin de la ville.',
    tips: ['Prends de l’eau, une casquette et de la marge batterie.', 'Le retour doit être anticipé.'],
    latitude: 43.5317,
    longitude: 5.5714,
    rechargeStatus: 'none',
  },
  {
    id: 'roques-hautes',
    name: 'Roques-Hautes',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 12.6,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['nature', 'patrimoine'],
    description:
      'Secteur très pratique pour prolonger Bimont, avec paysages ouverts, marche facile et ambiance plus minérale.',
    tips: ['Bien pour une boucle douce.', 'À réserver à une journée bien préparée.'],
    latitude: 43.5269,
    longitude: 5.5868,
    rechargeStatus: 'none',
  },
  {
    id: 'sainte-victoire-le-tholonet',
    name: 'Sainte-Victoire / Le Tholonet',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 8.9,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['nature', 'patrimoine'],
    description:
      'Le bon compromis entre route et paysage si tu veux approcher Sainte-Victoire sans partir sur une journée trop ambitieuse.',
    tips: ['Vérifie la chaleur et le vent.', 'Sortie plus agréable tôt le matin.'],
    latitude: 43.5298,
    longitude: 5.5231,
    rechargeStatus: 'none',
  },
  {
    id: 'lac-de-peyrolles',
    name: 'Lac de Peyrolles',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 17.5,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['nature', 'calme'],
    description:
      'Sortie facile autour d’un lac aménagé, utile quand tu veux rouler plus loin puis te poser dans un cadre très lisible.',
    tips: ['Bonne option pour une demi-journée.', 'Prévois un retour confortable.'],
    latitude: 43.6489,
    longitude: 5.5869,
    rechargeStatus: 'verify',
  },
  {
    id: 'lambesc',
    name: 'Lambesc',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 22.8,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '2 h à 4 h',
    moods: ['village', 'patrimoine'],
    description:
      'Village provençal pratique pour une boucle simple, avec ruelles, ambiance locale et une sortie de journée sans excentricité.',
    tips: ['Reste sur une logique aller-retour prudente.', 'Le coeur de village se visite bien à pied.'],
    latitude: 43.6387,
    longitude: 5.2616,
    rechargeStatus: 'verify',
  },
  {
    id: 'venelles',
    name: 'Venelles',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 6.8,
    distanceLabel: '3–7 km',
    budget: '0€',
    duration: '1 h à 2 h',
    moods: ['nature', 'village'],
    description:
      'Une sortie simple pour changer d’air sans trop tirer sur la batterie, avec collines et respiration plus large que le centre d’Aix.',
    tips: ['Très bien pour une boucle courte du week-end.', 'Le dénivelé reste modéré mais à surveiller.'],
    latitude: 43.5915,
    longitude: 5.4845,
    rechargeStatus: 'none',
  },
  {
    id: 'le-puy-sainte-reparade',
    name: 'Le Puy-Sainte-Réparade',
    category: 'journee',
    area: 'pays-aix',
    distanceKmFromAix: 25.7,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '2 h à 4 h',
    moods: ['nature', 'village'],
    description:
      'Bonne destination quand tu veux un fond de sortie au bord de l’eau ou une boucle plus calme qu’Aix, sans partir trop loin.',
    tips: ['Intéressant si tu veux prolonger vers le canal.', 'Prends une marge batterie au retour.'],
    latitude: 43.6319,
    longitude: 5.4069,
    rechargeStatus: 'verify',
  },
  {
    id: 'la-roque-d-antheron',
    name: "La Roque-d’Anthéron",
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 34.6,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 5 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Sortie plus longue entre patrimoine, nature et ambiance de village, à envisager en vraie journée ou avec solution de retour.',
    tips: ['Mieux avec un plan de retour.', 'Très bien si tu veux faire une vraie coupure.'],
    latitude: 43.7063,
    longitude: 5.3089,
    rechargeStatus: 'verify',
  },
  {
    id: 'salon-de-provence',
    name: 'Salon-de-Provence',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 45.2,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 6 h',
    moods: ['patrimoine', 'village'],
    description:
      'Centre historique, fontaines et château: une destination plus lointaine qui demande de penser au retour avant de partir.',
    tips: ['Meilleur en journée complète.', 'Compatible avec un retour en train ou covoiturage.'],
    latitude: 43.6406,
    longitude: 5.0974,
    rechargeStatus: 'verify',
  },
  {
    id: 'cassis',
    name: 'Cassis',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 48.9,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'patrimoine', 'nature'],
    description:
      'Une belle sortie littorale: port, vues, falaises et ambiance mer. Très attrayante, mais à traiter comme une vraie journée.',
    tips: ['Évite les heures les plus chaudes.', 'Prévois une solution de retour adaptée.'],
    latitude: 43.214,
    longitude: 5.5371,
    rechargeStatus: 'verify',
  },
  {
    id: 'carry-le-rouet',
    name: 'Carry-le-Rouet',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 66.4,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'village'],
    description:
      'Bord de mer, balade littorale et ambiance de fin de journée sur la Côte Bleue: un vrai changement d’air.',
    tips: ['Bonne option pour un coucher de soleil.', 'À combiner avec train ou retour motorisé.'],
    latitude: 43.3311,
    longitude: 5.1531,
    rechargeStatus: 'verify',
  },
  {
    id: 'sausset-les-pins',
    name: 'Sausset-les-Pins',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 69.1,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'village'],
    description:
      'Sortie littorale simple à lire, utile si tu veux mêler mer, petites rues et marche sans entrer dans une grosse logistique.',
    tips: ['Très bien avec un départ tôt.', 'Prends en compte le vent côtier.'],
    latitude: 43.3315,
    longitude: 5.1046,
    rechargeStatus: 'verify',
  },
  {
    id: 'marseille-vieux-port-littoral',
    name: 'Marseille Vieux-Port / littoral',
    category: 'journee',
    area: 'marseille',
    distanceKmFromAix: 31.8,
    distanceLabel: '+30 km',
    budget: 'variable',
    duration: '3 h à 6 h',
    moods: ['mer', 'patrimoine', 'marché'],
    description:
      'Sortie urbaine et marine à la fois, avec beaucoup de possibilités de flânerie. Le retour doit être anticipé, surtout si tu comptes charger.',
    tips: ['Repère la recharge avant de partir.', 'Bonne sortie si tu aimes l’ambiance de centre-ville.'],
    latitude: 43.2965,
    longitude: 5.3698,
    rechargeStatus: 'verify',
  },
  {
    id: 'sources-de-l-infernet',
    name: "Sources de l’Infernet",
    category: 'weekend',
    area: 'provence',
    distanceKmFromAix: 19.6,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['nature', 'calme'],
    description:
      'Décor minéral surprenant et assez atypique, intéressant pour une sortie plus nature en fin d’après-midi.',
    tips: ['Vérifie la chaleur et l’état du terrain.', 'Bonne option si tu veux quelque chose de différent.'],
    latitude: 43.4558,
    longitude: 5.2487,
    rechargeStatus: 'none',
  },
  {
    id: 'grottes-de-cales',
    name: 'Grottes de Calès',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 44.8,
    distanceLabel: '+30 km',
    budget: '0€',
    duration: '3 h à 5 h',
    moods: ['patrimoine', 'nature'],
    description:
      'Sortie plus atypique, entre patrimoine troglodyte et roche, à garder pour une vraie journée Provence.',
    tips: ['Choisis un départ avec peu de chaleur.', 'Reste attentif aux zones de marche.'],
    latitude: 43.6218,
    longitude: 5.0474,
    rechargeStatus: 'verify',
  },
  {
    id: 'voie-verte-du-calavon',
    name: 'Voie verte du Calavon',
    category: 'journee',
    area: 'luberon',
    distanceKmFromAix: 61.9,
    distanceLabel: '+30 km',
    budget: '0€',
    duration: '3 h à 6 h',
    moods: ['nature', 'village'],
    description:
      'Grand itinéraire à réserver aux journées longues, avec paysage plus doux et intérêt fort si tu veux rouler sans trop de circulation.',
    tips: ['Le train peut simplifier la logistique.', 'Très bien si tu aimes les voies douces.'],
    latitude: 43.8772,
    longitude: 5.3856,
    rechargeStatus: 'verify',
  },
  {
    id: 'avignon-ile-de-la-barthelasse',
    name: "Avignon / île de la Barthelasse",
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 79.6,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['patrimoine', 'nature', 'village'],
    description:
      'Sortie lointaine à envisager comme une journée complète: fleuve, ponts, remparts et ambiance de ville historique.',
    tips: ['Prévois le retour avant de partir.', 'Bon candidat pour train + trottinette.'],
    latitude: 43.9641,
    longitude: 4.8137,
    rechargeStatus: 'verify',
  },
  {
    id: 'luberon-roussillon',
    name: 'Luberon / Roussillon',
    category: 'journee',
    area: 'luberon',
    distanceKmFromAix: 65.8,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['village', 'nature', 'patrimoine'],
    description:
      'Village d’ocre très marquant visuellement, à traiter comme une escapade Provence plutôt qu’une simple balade de proximité.',
    tips: ['Prépare un retour ou une liaison ferroviaire.', 'L’ocre et le vent sec peuvent compter.'],
    latitude: 43.9007,
    longitude: 5.2927,
    rechargeStatus: 'verify',
  },
  {
    id: 'luberon-gordes',
    name: 'Luberon / Gordes',
    category: 'journee',
    area: 'luberon',
    distanceKmFromAix: 72.4,
    distanceLabel: '+30 km',
    budget: 'variable',
    duration: '4 h à 7 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Village perché emblématique, plus ambitieux mais très satisfaisant si tu veux une vraie sortie longue avec paysage de carte postale.',
    tips: ['Meilleur avec une journée large.', 'Logistique de retour à anticiper sérieusement.'],
    latitude: 43.9119,
    longitude: 5.2009,
    rechargeStatus: 'verify',
  },
  {
    id: 'luberon-bonnieux',
    name: 'Luberon / Bonnieux',
    category: 'journee',
    area: 'luberon',
    distanceKmFromAix: 68.7,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['village', 'nature', 'patrimoine'],
    description:
      'Village du Luberon avec relief, points de vue et ambiance provençale. Très belle sortie, à réserver à une journée complète.',
    tips: ['Le relief est plus exigeant qu’il n’y paraît.', 'Vérifie la météo et le vent.'],
    latitude: 43.8249,
    longitude: 5.3086,
    rechargeStatus: 'verify',
  },
  {
    id: 'eguilles',
    name: 'Éguilles',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 11.4,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h à 2 h',
    moods: ['village', 'nature'],
    description:
      'Boucle simple vers un village perché à l’ouest d’Aix, utile pour une sortie courte avec un peu de respiration.',
    tips: ['Privilégie une heure calme.', 'Le retour est plus agréable avant la nuit.'],
    latitude: 43.5719,
    longitude: 5.3552,
    rechargeStatus: 'verify',
  },
  {
    id: 'ventabren',
    name: 'Ventabren',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 16.8,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['village', 'nature', 'patrimoine'],
    description:
      'Sortie de colline pratique pour changer d’ambiance, avec un village lisible et un trajet à garder indicatif.',
    tips: ['Prévois une marge batterie.', 'L’arrivée au village se fait mieux tôt.'],
    latitude: 43.5527,
    longitude: 5.2938,
    rechargeStatus: 'verify',
  },
  {
    id: 'coudoux',
    name: 'Coudoux',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 22.4,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['village', 'nature'],
    description:
      'Destination de liaison simple pour une boucle un peu plus longue, avec un trajet prudent à planifier en aller-retour.',
    tips: ['À privilégier par météo stable.', 'Reste sur un trajet lisible.'],
    latitude: 43.5581,
    longitude: 5.2449,
    rechargeStatus: 'verify',
  },
  {
    id: 'rognes',
    name: 'Rognes',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 23.6,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '2 h à 4 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Village du nord-ouest aixois, intéressant pour une sortie plus structurée avec pause et retour planifié.',
    tips: ['Meilleur avec départ matinal.', 'Les portions ouvertes demandent de la prudence au vent.'],
    latitude: 43.6568,
    longitude: 5.3464,
    rechargeStatus: 'verify',
  },
  {
    id: 'saint-cannat',
    name: 'Saint-Cannat',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 18.2,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '1 h 30 à 3 h',
    moods: ['village', 'patrimoine'],
    description:
      'Boucle de village très lisible pour rouler sans se compliquer la vie, avec un retour à garder confortable.',
    tips: ['Bonne option en milieu de journée.', 'Reste attentif aux traversées de route.'],
    latitude: 43.6207,
    longitude: 5.3075,
    rechargeStatus: 'verify',
  },
  {
    id: 'pertuis',
    name: 'Pertuis',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 29.4,
    distanceLabel: '15–30 km',
    budget: '<10€',
    duration: '2 h 30 à 5 h',
    moods: ['village', 'patrimoine'],
    description:
      'Porte du Luberon pour une journée simple, avec un trajet plus long à garder sous contrôle et une pause à prévoir.',
    tips: ['L’itinéraire doit rester prudent.', 'Prévois de l’eau et du temps.'],
    latitude: 43.6947,
    longitude: 5.5014,
    rechargeStatus: 'verify',
  },
  {
    id: 'meyreuil',
    name: 'Meyreuil',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 10.9,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h à 2 h',
    moods: ['nature', 'village'],
    description:
      'Boucle courte à l’est d’Aix, utile pour sortir de la ville sans viser une logistique compliquée.',
    tips: ['Bien pour une sortie en lumière douce.', 'La circulation locale peut compter.'],
    latitude: 43.4878,
    longitude: 5.5118,
    rechargeStatus: 'none',
  },
  {
    id: 'gardanne',
    name: 'Gardanne',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 16.3,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['village', 'nature'],
    description:
      'Sortie de liaison assez simple, intéressante si tu veux une ville de transition avant une boucle plus large.',
    tips: ['Prends en compte les axes circulés.', 'Le centre se prête bien à une pause courte.'],
    latitude: 43.4529,
    longitude: 5.4708,
    rechargeStatus: 'verify',
  },
  {
    id: 'fuveau',
    name: 'Fuveau',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 20.8,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '2 h à 4 h',
    moods: ['village', 'nature'],
    description:
      'Village pratique pour une sortie un peu plus éloignée mais encore raisonnable en autonomie si le retour est prévu.',
    tips: ['Vérifie le vent avant de partir.', 'Idéal pour une boucle de demi-journée.'],
    latitude: 43.4518,
    longitude: 5.5631,
    rechargeStatus: 'verify',
  },
  {
    id: 'trets',
    name: 'Trets',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 27.8,
    distanceLabel: '15–30 km',
    budget: '<5€',
    duration: '2 h 30 à 5 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Destination de fond de vallée à traiter comme une vraie sortie de journée, avec retour réfléchi avant de partir.',
    tips: ['Pars tôt si tu veux éviter la chaleur.', 'Le relief peut allonger le trajet.'],
    latitude: 43.4461,
    longitude: 5.6958,
    rechargeStatus: 'verify',
  },
  {
    id: 'cabries-calas',
    name: 'Cabriès / Calas',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 14.1,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['village', 'nature'],
    description:
      'Sortie de transition entre ville et périphérie, utile pour rouler sans viser un grand dénivelé ni une longue logistique.',
    tips: ['Pratique pour une boucle courte.', 'Garde un oeil sur les carrefours.'],
    latitude: 43.4542,
    longitude: 5.3677,
    rechargeStatus: 'nearby',
  },
  {
    id: 'simiane-collongue',
    name: 'Simiane-Collongue',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 13.6,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['village', 'nature'],
    description:
      'Village pratique pour une demi-journée tranquille, avec un parcours à garder simple et une pause facile.',
    tips: ['Arrive avec une batterie confortable.', 'Bonne option si tu veux un itinéraire lisible.'],
    latitude: 43.4306,
    longitude: 5.4311,
    rechargeStatus: 'verify',
  },
  {
    id: 'vitrolles-arbois',
    name: 'Vitrolles / Plateau de l’Arbois',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 24.9,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h 30 à 5 h',
    moods: ['nature'],
    description:
      'Zone ouverte à la frontière entre ville, franges industrielles et espaces naturels, à réserver à une sortie bien préparée.',
    tips: ['Vérifie les accès avant de partir.', 'Le vent peut être plus présent sur le plateau.'],
    latitude: 43.4892,
    longitude: 5.2504,
    rechargeStatus: 'verify',
  },
  {
    id: 'saint-chamas-etang-de-berre',
    name: 'Étang de Berre / Saint-Chamas',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 38.5,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 6 h',
    moods: ['nature', 'village', 'mer'],
    description:
      'Sortie plus lointaine autour de l’étang, avec de l’espace et une ambiance de promenade à traiter comme une vraie journée.',
    tips: ['Prévois une marge de retour.', 'Le bord de l’eau peut être venteux.'],
    latitude: 43.5427,
    longitude: 5.0401,
    rechargeStatus: 'verify',
  },
  {
    id: 'la-fare-les-oliviers',
    name: 'La Fare-les-Oliviers',
    category: 'weekend',
    area: 'provence',
    distanceKmFromAix: 27.1,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h à 4 h',
    moods: ['village', 'nature'],
    description:
      'Boucle intermédiaire facile à comprendre, adaptée à une sortie simple si tu gardes un retour prudent.',
    tips: ['Mieux par temps stable.', 'Le stationnement doit rester simple et légal.'],
    latitude: 43.5508,
    longitude: 5.2136,
    rechargeStatus: 'verify',
  },
  {
    id: 'la-barben',
    name: 'La Barben',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 34.1,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '2 h 30 à 5 h',
    moods: ['nature', 'patrimoine', 'village'],
    description:
      'Destination de journée avec ambiance de campagne et de patrimoine, à garder comme sortie préparée plutôt que spontanée.',
    tips: ['Départ tôt conseillé.', 'Prends une marge batterie pour le retour.'],
    latitude: 43.6257,
    longitude: 5.2012,
    rechargeStatus: 'verify',
  },
  {
    id: 'lourmarin',
    name: 'Lourmarin',
    category: 'journee',
    area: 'luberon',
    distanceKmFromAix: 37.8,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 6 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Village du Luberon très agréable, mais à considérer comme une vraie escapade avec retour planifié et pause sur place.',
    tips: ['Idéal en début de journée.', 'Le retour ne doit pas être improvisé.'],
    latitude: 43.7659,
    longitude: 5.3648,
    rechargeStatus: 'verify',
  },
  {
    id: 'mallemort',
    name: 'Mallemort',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 36.9,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 6 h',
    moods: ['village', 'nature'],
    description:
      'Sortie plus longue vers la vallée de la Durance, utile si tu veux une journée calme avec peu de complexité touristique.',
    tips: ['Vérifie le vent et la chaleur.', 'Bonne option si tu aimes les sorties linéaires.'],
    latitude: 43.7304,
    longitude: 5.1812,
    rechargeStatus: 'verify',
  },
  {
    id: 'miramas-le-vieux',
    name: 'Miramas-le-Vieux',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 41.7,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '3 h à 6 h',
    moods: ['village', 'patrimoine', 'nature'],
    description:
      'Vieux village perché intéressant pour une journée plus longue, avec un trajet à préparer et à garder prudent.',
    tips: ['Prévois une pause en chemin.', 'Le relief mérite d’être pris au sérieux.'],
    latitude: 43.5894,
    longitude: 5.0029,
    rechargeStatus: 'verify',
  },
  {
    id: 'martigues',
    name: 'Martigues',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 53.8,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'patrimoine', 'village'],
    description:
      'Ville d’eau et de port à envisager comme une vraie journée littorale, avec un retour clairement anticipé.',
    tips: ['Bonne sortie par temps doux.', 'Le bord de mer peut être exposé au vent.'],
    latitude: 43.4075,
    longitude: 5.0556,
    rechargeStatus: 'verify',
  },
  {
    id: 'niolon',
    name: 'Niolon',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 55.9,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'nature'],
    description:
      'Petit secteur littoral à réserver à une sortie préparée, avec de belles vues mais une logistique à surveiller.',
    tips: ['Le train peut simplifier le retour.', 'Prévois un stationnement très simple.'],
    latitude: 43.3198,
    longitude: 5.2407,
    rechargeStatus: 'verify',
  },
  {
    id: 'ensues-la-redonne',
    name: 'Ensuès-la-Redonne',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 57.3,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'nature', 'village'],
    description:
      'Village littoral pratique pour une sortie de bord de mer, avec un trajet à garder indicatif et les vents à anticiper.',
    tips: ['Partir tôt reste la meilleure option.', 'Le stationnement côtier peut être limité.'],
    latitude: 43.3319,
    longitude: 5.1926,
    rechargeStatus: 'verify',
  },
  {
    id: 'carry-le-rouet',
    name: 'Carry-le-Rouet',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 66.4,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'village'],
    description:
      'Bord de mer, balade littorale et ambiance de fin de journée sur la Côte Bleue: un vrai changement d’air.',
    tips: ['Bonne option pour un coucher de soleil.', 'À combiner avec train ou retour motorisé.'],
    latitude: 43.3311,
    longitude: 5.1531,
    rechargeStatus: 'verify',
  },
  {
    id: 'sausset-les-pins',
    name: 'Sausset-les-Pins',
    category: 'journee',
    area: 'cote-bleue',
    distanceKmFromAix: 69.1,
    distanceLabel: '+30 km',
    budget: '<10€',
    duration: '4 h à 7 h',
    moods: ['mer', 'village'],
    description:
      'Sortie littorale simple à lire, utile si tu veux mêler mer, petites rues et marche sans entrer dans une grosse logistique.',
    tips: ['Très bien avec un départ tôt.', 'Prends en compte le vent côtier.'],
    latitude: 43.3315,
    longitude: 5.1046,
    rechargeStatus: 'verify',
  },
  {
    id: 'la-ciotat',
    name: 'La Ciotat',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 61.8,
    distanceLabel: '+30 km',
    budget: 'variable',
    duration: '4 h à 7 h',
    moods: ['mer', 'patrimoine', 'nature'],
    description:
      'Sortie méditerranéenne plus ambitieuse, intéressante pour le bord de mer mais à aborder comme une vraie journée.',
    tips: ['Le littoral impose de la marge.', 'Le retour doit être anticipé.'],
    latitude: 43.1731,
    longitude: 5.6028,
    rechargeStatus: 'verify',
  },
  {
    id: 'le-tholonet-lac-zola',
    name: 'Le Tholonet / Lac Zola',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 7.8,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['nature', 'calme', 'patrimoine'],
    description:
      'Boucle très intéressante pour un week-end doux, avec un itinéraire à garder indicatif autour du canal et du lac.',
    tips: ['Départ matinal conseillé.', 'Vérifie les portions partagées avec les voitures.'],
    latitude: 43.5169,
    longitude: 5.5258,
    rechargeStatus: 'none',
  },
  {
    id: 'palette-route-cezanne',
    name: 'Palette / route Cézanne',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 6.5,
    distanceLabel: '3–7 km',
    budget: '0€',
    duration: '1 h à 2 h',
    moods: ['nature', 'patrimoine', 'calme'],
    description:
      'Sortie courte et symbolique vers le versant de Cézanne, à garder comme itinéraire indicatif avec portions partagées.',
    tips: ['Reste prudent dans les secteurs routiers.', 'Idéal en lumière douce.'],
    latitude: 43.529,
    longitude: 5.5142,
    rechargeStatus: 'nearby',
  },
  {
    id: 'parc-de-la-duranne',
    name: 'Parc de la Duranne',
    category: 'soir',
    area: 'aix',
    distanceKmFromAix: 9.6,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '45 min à 1 h 30',
    moods: ['calme', 'nature'],
    description:
      'Secteur simple à rejoindre pour une balade courte en périphérie, utile quand tu veux une sortie facile à lire.',
    tips: ['Bon choix en fin d’après-midi.', 'Surveille les liaisons entre quartiers.'],
    latitude: 43.5085,
    longitude: 5.3564,
    rechargeStatus: 'nearby',
  },
  {
    id: 'domaine-de-saint-pons',
    name: 'Domaine de Saint-Pons',
    category: 'weekend',
    area: 'pays-aix',
    distanceKmFromAix: 14.8,
    distanceLabel: '7–15 km',
    budget: '0€',
    duration: '1 h 30 à 3 h',
    moods: ['nature', 'calme', 'patrimoine'],
    description:
      'Domaine naturel agréable pour une sortie paisible, avec un trajet indicatif à vérifier selon les accès du jour.',
    tips: ['Prends une marge batterie.', 'Le stationnement doit rester simple.'],
    latitude: 43.4426,
    longitude: 5.6031,
    rechargeStatus: 'verify',
  },
  {
    id: 'plan-deau-plantain-peyrolles',
    name: 'Plan d’eau de Plantain / Peyrolles',
    category: 'journee',
    area: 'provence',
    distanceKmFromAix: 24.7,
    distanceLabel: '15–30 km',
    budget: '0€',
    duration: '2 h 30 à 5 h',
    moods: ['nature', 'calme'],
    description:
      'Sortie au bord de l’eau à garder pour une journée préparée, avec une autonomie et un retour à surveiller de près.',
    tips: ['Départ tôt conseillé.', 'Bonne option quand tu veux une pause nature claire.'],
    latitude: 43.6618,
    longitude: 5.6157,
    rechargeStatus: 'verify',
  },
];

const destinationLabels: Record<Spot['area'], string> = {
  aix: 'Aix-en-Provence',
  'pays-aix': 'Pays d’Aix',
  provence: 'Provence',
  marseille: 'Marseille',
  luberon: 'Luberon',
  'cote-bleue': 'Côte Bleue',
};

function routeTypeForSpot(spot: SpotInput): Spot['routeType'] {
  if (spot.area === 'aix' || spot.area === 'marseille') return 'urbain';
  if (spot.area === 'cote-bleue') return 'littoral';
  if (spot.area === 'luberon') return 'village';
  if (spot.distanceKmFromAix <= 12) return 'mixte';
  if (spot.category === 'journee') return 'nature';
  return 'mixte';
}

function difficultyForDistance(distanceKmFromAix: number): Spot['difficulty'] {
  if (distanceKmFromAix <= 7) return 'facile';
  if (distanceKmFromAix <= 20) return 'intermédiaire';
  return 'préparée';
}

function cyclingInfrastructureForRouteType(routeType: Spot['routeType']) {
  switch (routeType) {
    case 'urbain':
    case 'littoral':
      return {
        status: 'partial' as const,
        label: 'Pistes partielles',
        notes: 'Présence d’aménagements ponctuels ou partiels selon les secteurs; itinéraire indicatif uniquement.',
      };
    case 'village':
      return {
        status: 'limited' as const,
        label: 'Aménagements limités',
        notes: 'Peu d’aménagements continus garantis; vérifie le trajet avant de partir.',
      };
    case 'nature':
    case 'mixte':
      return {
        status: 'unknown' as const,
        label: 'À vérifier',
        notes: 'Aucune continuité d’aménagement à supposer sans vérification locale.',
      };
  }
}

function roadSafetyForRouteType(routeType: Spot['routeType']) {
  switch (routeType) {
    case 'urbain':
      return {
        level: 'moderate' as const,
        notes: 'Trajet principalement urbain avec intersections et portions partagées; reste prudent aux carrefours.',
      };
    case 'littoral':
      return {
        level: 'caution' as const,
        notes: 'Vent et exposition côtière peuvent peser; garde une marge et évite les heures chargées.',
      };
    case 'village':
      return {
        level: 'caution' as const,
        notes: 'Rues de village et traversées locales: privilégie un roulage calme et un stationnement simple.',
      };
    case 'nature':
      return {
        level: 'caution' as const,
        notes: 'Secteur plus ouvert ou naturel, avec revêtement et traversées à vérifier avant le départ.',
      };
    case 'mixte':
      return {
        level: 'unknown' as const,
        notes: 'Trajet mixte: certaines portions sont plus tranquilles, d’autres peuvent être partagées avec les voitures.',
      };
  }
}

function bestTimeForSpot(spot: SpotInput) {
  if (spot.distanceKmFromAix > 30) {
    return 'Départ tôt, retour planifié avant la nuit';
  }
  if (spot.category === 'soir') {
    return 'Fin d’après-midi / début de soirée';
  }
  if (spot.rechargeStatus === 'verify') {
    return 'Matin avec marge de contrôle sur place';
  }
  if (spot.category === 'weekend') {
    return 'Matin ou fin d’après-midi';
  }
  return 'Matin';
}

function parkingAdviceForRouteType(routeType: Spot['routeType']) {
  switch (routeType) {
    case 'urbain':
      return 'Choisis un stationnement court, légal et visible, puis garde la trottinette avec toi si tu t’arrêtes longtemps.';
    case 'littoral':
      return 'Anticipe le stationnement, surtout le week-end et près du front de mer.';
    case 'village':
      return 'Vise un parking périphérique simple et garde une solution de cadenas légère.';
    case 'nature':
      return 'Stationne au départ d’une boucle claire et évite les zones isolées pour les pauses longues.';
    case 'mixte':
      return 'Repère un parking de repli et privilégie un arrêt simple à surveiller.';
  }
}

function routeNotesForRouteType(routeType: Spot['routeType']) {
  switch (routeType) {
    case 'urbain':
      return 'Itinéraire indicatif en milieu urbain, à vérifier sur place pour les traversées, pistes éventuelles et zones piétonnes.';
    case 'littoral':
      return 'Itinéraire indicatif sur secteur côtier, avec vent, stationnement et portions discontinues à vérifier.';
    case 'village':
      return 'Itinéraire indicatif vers un village, avec quelques traversées locales et un stationnement à choisir avec prudence.';
    case 'nature':
      return 'Itinéraire indicatif en secteur plus naturel ou ouvert, à vérifier pour le revêtement et les accès.';
    case 'mixte':
      return 'Itinéraire indicatif mixte, avec portions variées à confirmer avant de partir.';
  }
}

function enrichSpot(spot: SpotInput): Spot {
  const routeType = routeTypeForSpot(spot);
  const cyclingInfrastructure = cyclingInfrastructureForRouteType(routeType);
  const roadSafety = roadSafetyForRouteType(routeType);

  return {
    ...spot,
    address: `${spot.name}, ${destinationLabels[spot.area]}`,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`,
    routeNotes: routeNotesForRouteType(routeType),
    cyclingInfrastructure,
    roadSafety,
    parkingAdvice: parkingAdviceForRouteType(routeType),
    bestTime: bestTimeForSpot(spot),
    isSimpleRide: spot.distanceKmFromAix <= 7,
    difficulty: difficultyForDistance(spot.distanceKmFromAix),
    routeType,
  };
}

export const spots: Spot[] = rawSpots.map((spot) => enrichSpot(spot));

export const distanceBands = ['0–3 km', '3–7 km', '7–15 km', '15–30 km', '+30 km'] as const;
export const budgets = ['0€', '<5€', '<10€', 'variable'] as const;
export const moments = ['soir', 'weekend', 'journee'] as const;
export const moods = ['calme', 'nature', 'patrimoine', 'mer', 'village', 'marché'] as const;
export const rechargeStatuses = ['none', 'nearby', 'confirmed', 'verify'] as const;
