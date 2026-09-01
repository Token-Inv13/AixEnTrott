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
  editorial?: SpotEditorial;
};

export type SpotEditorialSource = {
  label: string;
  url: string;
};

export type SpotEditorial = {
  introduction: string[];
  profile: {
    environment: string;
    terrain: string;
    travelStyle: string;
    bestFor: string;
  };
  routeSections: Array<{
    title: string;
    text: string;
  }>;
  access: string[];
  watchOutFor: string[];
  verificationNote: string;
  sources: SpotEditorialSource[];
  detailOverrides: {
    routeNotes: string;
    cyclingInfrastructure: Spot['cyclingInfrastructure'];
    roadSafety: Spot['roadSafety'];
    parkingAdvice: string;
    bestTime: string;
  };
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
      'Une courte approche depuis Aix vers une promenade piétonne de huit hectares, à parcourir calmement au bord de la Torse entre la route Cézanne et la route de Nice.',
    tips: [
      'Utilise la trottinette pour l’approche urbaine, puis prévois de marcher dans la promenade.',
      'Consulte les horaires saisonniers du parc avant une sortie en fin de journée.',
      'Garde la trottinette avec toi pendant la pause plutôt que de la laisser sans surveillance.',
    ],
    latitude: 43.5348,
    longitude: 5.4532,
    rechargeStatus: 'nearby',
    editorial: {
      introduction: [
        'La Torse répond à un besoin simple : quitter le centre d’Aix pour une pause verte sans transformer la sortie en demi-journée. La distance d’approche reste courte et permet de conserver une marge batterie confortable.',
        'La Ville décrit le site comme une liaison piétonne entre les quartiers sud-est et est. Le cheminement suit le ruisseau, franchit plusieurs passerelles et traverse un parc fréquenté par les joggeurs et les familles : l’usage le plus prudent consiste donc à rejoindre une entrée en trottinette, puis à continuer à pied.',
        'Cette fiche ne cherche pas à gonfler artificiellement la sortie. Son intérêt tient à sa proximité, à ses horaires clairement publiés et à la possibilité de faire demi-tour facilement si le parc est fréquenté ou si la météo se dégrade.',
      ],
      profile: {
        environment: 'Parc urbain champêtre le long du ruisseau de la Torse, avec passerelles, grands platanes et plan d’eau.',
        terrain: 'Approche urbaine courte, puis cheminement piéton à parcourir à pied et à vérifier aux entrées.',
        travelStyle: 'Sortie de proximité : quelques kilomètres d’approche, une marche dans le parc, puis retour direct.',
        bestFor: 'Une pause de 45 à 90 minutes, une fin de journée calme ou une sortie avec très peu de logistique.',
      },
      routeSections: [
        {
          title: 'Approche depuis Aix',
          text: 'Choisis une arrivée par la route Cézanne ou la route de Nice selon ton point de départ. Les derniers carrefours restent urbains et demandent davantage d’attention que le parc lui-même.',
        },
        {
          title: 'Dans la promenade',
          text: 'Le parcours municipal relie la route Cézanne à la route de Nice en suivant le cours d’eau. Comme il s’agit d’une liaison piétonne fréquentée, marche avec la trottinette et laisse la priorité complète aux promeneurs.',
        },
      ],
      access: [
        'Vérifie l’entrée la plus logique sur la carte avant de partir afin d’éviter un détour autour du parc.',
        'Les horaires varient selon les mois, avec une fermeture plus précoce en hiver : ne pars pas sur l’hypothèse d’un accès permanent.',
      ],
      watchOutFor: [
        'Présence régulière de joggeurs, familles et enfants sur un cheminement avant tout piéton.',
        'Passerelles et abords du ruisseau à aborder à pied, particulièrement si le sol est humide.',
        'Sortie courte mais parc fermé en dehors des horaires municipaux publiés.',
      ],
      verificationNote:
        'Informations vérifiées à distance à partir des pages de la Ville d’Aix-en-Provence. Les horaires, accès et règles affichées aux entrées restent à vérifier sur place.',
      sources: [
        {
          label: 'Ville d’Aix-en-Provence — Promenade de la Torse',
          url: 'https://www.aixenprovence.fr/Promenade-de-la-Torse',
        },
        {
          label: 'Ville d’Aix-en-Provence — Dépliant des espaces verts',
          url: 'https://www.aixenprovence.fr/IMG/pdf/espacesverts_depliant2.pdf',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche urbaine vers une entrée du parc, puis cheminement piéton entre la route Cézanne et la route de Nice. Prévoir de marcher avec la trottinette dans la promenade.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Approche urbaine, promenade piétonne',
          notes:
            'La source municipale qualifie le site de liaison piétonne ; aucune continuité cyclable interne ne doit être supposée.',
        },
        roadSafety: {
          level: 'easy',
          notes:
            'La distance est courte, mais les carrefours d’approche et la cohabitation avec les piétons imposent une allure lente et un passage à pied dans le parc.',
        },
        parkingAdvice:
          'Évite de laisser la trottinette seule : garde-la avec toi pendant la marche ou utilise uniquement un point d’attache autorisé et visible.',
        bestTime: 'Pendant les horaires d’ouverture, plutôt hors des périodes les plus fréquentées',
      },
    },
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
      'Une approche préparée vers le parking et le barrage de Bimont, avec panorama sur Sainte-Victoire et prolongements pédestres soumis aux règles du massif.',
    tips: [
      'Sépare clairement l’approche en trottinette de la visite pédestre du barrage et des sentiers.',
      'Emporte de l’eau : aucune recharge ni ressource sur place ne doit être considérée comme acquise.',
      'Entre juin et septembre, consulte la carte préfectorale d’accès aux massifs la veille au soir.',
      'Ne descends pas sur les rives et ne prévois ni baignade ni canotage dans la retenue.',
    ],
    latitude: 43.5317,
    longitude: 5.5714,
    rechargeStatus: 'none',
    editorial: {
      introduction: [
        'Bimont est une destination nature forte à moins de quinze kilomètres indicatifs d’Aix, mais ce n’est pas une simple promenade urbaine. L’aller-retour théorique dépasse déjà vingt kilomètres avant toute variation de départ, de relief ou de détour.',
        'Le point utile pour préparer la sortie est le parking visiteurs situé à proximité du barrage. Une fois sur place, la traversée de l’ouvrage ouvre sur des sentiers balisés vers Sainte-Victoire ou Zola ; ces prolongements relèvent d’une logique pédestre et ne doivent pas être présentés comme un itinéraire trottinette autorisé.',
        'Le secteur est exposé aux règles d’accès des massifs forestiers en été. Le bon plan consiste à vérifier l’ouverture, la météo et la marge batterie avant le départ, puis à accepter de raccourcir la visite si les conditions changent.',
      ],
      profile: {
        environment: 'Retenue artificielle, barrage et entrée du massif de Sainte-Victoire, avec vues ouvertes et sentiers très fréquentés.',
        terrain: 'Approche routière vallonnée, puis ouvrage et chemins de massif à traiter comme des secteurs pédestres.',
        travelStyle: 'Demi-journée préparée : rejoindre le parking, visiter le barrage à pied, puis revenir sans compter sur une recharge.',
        bestFor: 'Un panorama marqué et une courte découverte pédestre, avec batterie suffisante et plan de retour déjà établi.',
      },
      routeSections: [
        {
          title: 'Approche par Saint-Marc-Jaumegarde',
          text: 'Le trajet depuis Aix rejoint un secteur plus routier avant le parking du barrage. La distance calculée ne suffit pas à juger l’effort : compare aussi le profil batterie et les alternatives proposées par la carte.',
        },
        {
          title: 'Parking et couronnement du barrage',
          text: 'Le parking visiteurs sert de point de bascule. À partir de là, privilégie une visite à pied du barrage et respecte les portails, panneaux et éventuelles limitations temporaires.',
        },
        {
          title: 'Sentiers vers Sainte-Victoire ou Zola',
          text: 'Ces itinéraires sont balisés pour la randonnée et peuvent devenir techniques ou pentus. Ne les ajoute pas automatiquement à la sortie en trottinette et ne quitte pas les sentiers autorisés.',
        },
      ],
      access: [
        'Vise le parking visiteurs du barrage comme destination pratique, sans supposer qu’un autre accès au massif est ouvert.',
        'Du 1er juin au 30 septembre, l’accès est déterminé quotidiennement selon le risque incendie ; consulte la carte officielle pour le lendemain.',
      ],
      watchOutFor: [
        'Aucune recharge connue sur place et couverture réseau potentiellement irrégulière dans le massif.',
        'Baignade, canotage et accès aux rives de la retenue interdits pour des raisons de sécurité et d’environnement.',
        'Fréquentation importante autour du parking et du barrage, notamment les week-ends.',
        'Accès ou portails susceptibles d’être limités temporairement pour travaux, sécurité ou risque incendie.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès de Provence Tourisme, du Grand Site Concors Sainte-Victoire et de la Préfecture. L’ouverture du massif et les règles sur place peuvent évoluer.',
      sources: [
        {
          label: 'Provence Tourisme — Lac de Bimont',
          url: 'https://www.myprovence.fr/les-guides/loisirs/paysages-de-provence/saint-marc-jaumegarde/lac-de-bimont',
        },
        {
          label: 'Grand Site Concors Sainte-Victoire — Barrages Zola et Bimont',
          url: 'https://www.grandsitesaintevictoire.com/le-tholonet-barrages-zola-et-bimont/',
        },
        {
          label: 'Préfecture des Bouches-du-Rhône — Accès aux massifs',
          url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche routière jusqu’au parking visiteurs de Bimont. Au-delà, les sentiers et le couronnement du barrage sont à découvrir à pied, selon la signalisation et l’ouverture du massif.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Accès routier, puis domaine naturel',
          notes:
            'Aucune source officielle consultée ne confirme une voie cyclable continue depuis Aix ni l’autorisation de rouler sur les sentiers du barrage.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Relief, circulation d’approche, fréquentation du parking et règles du massif imposent une sortie préparée et une visite à pied sur place.',
        },
        parkingAdvice:
          'Utilise le parking visiteurs comme repère, vérifie les panneaux à l’arrivée et ne laisse pas la trottinette sans surveillance pendant une randonnée.',
        bestTime: 'Matin, après vérification de la météo et de l’accès officiel au massif',
      },
    },
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
      'Une destination Côte Bleue à préparer avec un départ rapproché ou le train, puis une boucle locale entre gare, port, centre et corniche.',
    tips: [
      'Depuis Aix, prépare d’abord l’accès et le retour : la distance exclut une sortie simple avec une batterie de 30 km.',
      'La gare se trouve en centre-ville ; vérifie les horaires TER et les conditions de transport de ta trottinette avant de partir.',
      'Utilise le port ou la gare comme point de départ local, puis adapte la boucle au vent et à la fréquentation.',
      'Dans les escaliers, passages étroits et secteurs piétons, descends et continue à pied.',
    ],
    latitude: 43.3315,
    longitude: 5.1046,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Sausset-les-Pins est la plus lointaine des six fiches pilotes depuis Aix. À près de soixante-dix kilomètres indicatifs à l’aller, elle doit être pensée comme une destination à rejoindre autrement, puis à explorer localement.',
        'La gare est située en centre-ville sur la ligne Marseille–Miramas. Elle permet d’organiser un départ rapproché autour du port sans consommer toute la batterie sur l’approche ; les horaires et l’acceptation de la trottinette doivent toutefois être vérifiés auprès du transporteur.',
        'Sur place, la commune documente une balade de quatre kilomètres entre centre, port, anse du Petit Nid et corniche. Cette référence aide à lire les secteurs, mais elle comprend escaliers et chemins de terre : ce n’est pas une promesse d’itinéraire roulant continu.',
      ],
      profile: {
        environment: 'Bourg littoral entre port de plaisance, centre ancien, criques, corniche et petites plages de la Côte Bleue.',
        terrain: 'Voirie locale, portions de front de mer, escaliers et courts passages non revêtus selon la boucle choisie.',
        travelStyle: 'Journée avec train, voiture ou autre retour alternatif, suivie d’une boucle locale courte.',
        bestFor: 'Profiter du littoral sans tenter l’aller-retour complet depuis Aix en trottinette.',
      },
      routeSections: [
        {
          title: 'Gare et centre-ville',
          text: 'La gare est proche du centre et constitue un point de départ lisible. Le port et l’office de tourisme peuvent ensuite servir de repères pour une boucle locale.',
        },
        {
          title: 'Port et anse du Petit Nid',
          text: 'Le parcours communal passe par le port, des rues du centre et l’anse du Petit Nid. Plusieurs escaliers et passages courts invitent à marcher avec la trottinette plutôt qu’à chercher une continuité forcée.',
        },
        {
          title: 'Corniche et retour',
          text: 'Le littoral est exposé au vent et peut être fréquenté. Fixe une heure de retour avant de prolonger la balade et garde la gare ou ton point de stationnement comme ancrage.',
        },
      ],
      access: [
        'La ligne TER Marseille–Miramas dessert Sausset-les-Pins ; la commune indique une gare en plein centre-ville.',
        'La commune recense des parkings gratuits, dont plusieurs en centre-ville, ainsi qu’une zone bleue limitée à deux heures.',
        'Vérifie le dernier retour, les travaux ferroviaires et les règles de transport de la trottinette avant le départ.',
      ],
      watchOutFor: [
        'Vent côtier capable d’augmenter nettement la consommation au retour.',
        'Port, plages et corniche très fréquentés en saison : priorité aux piétons et passage à pied dans les zones denses.',
        'Boucle officielle pédestre comportant escaliers et chemin de terre, donc non transposable intégralement en trottinette.',
        'Recharge indiquée comme à vérifier : ne la remplace pas par un plan de retour confirmé.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès de la Ville de Sausset-les-Pins et de SNCF TER. Horaires, travaux, vent, circulation et règles de transport peuvent évoluer.',
      sources: [
        {
          label: 'Ville de Sausset-les-Pins — Venir à Sausset',
          url: 'https://ville-sausset-les-pins.fr/decouvrir-la-ville/se-deplacer/info-transport/',
        },
        {
          label: 'Ville de Sausset-les-Pins — Sausset d’hier et d’aujourd’hui',
          url: 'https://ville-sausset-les-pins.fr/tourisme/balades/sausset-d-hier-et-d-aujourdhui/',
        },
        {
          label: 'SNCF TER — Gare de Sausset-les-Pins',
          url: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/gares/-87753558',
        },
        {
          label: 'Ville de Sausset-les-Pins — Stationnement',
          url: 'https://ville-sausset-les-pins.fr/decouvrir-la-ville/se-deplacer/stationner/',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Rejoindre Sausset avec un retour alternatif, puis construire une boucle locale entre gare, port et corniche. Les escaliers et passages piétons de la balade communale se parcourent à pied.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Boucle locale discontinue',
          notes:
            'Les sources décrivent une promenade et une balade pédestre ; aucune continuité cyclable complète autour du port et de la corniche n’est garantie.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Distance depuis Aix, vent, circulation locale et forte fréquentation littorale exigent un départ rapproché et un retour confirmé.',
        },
        parkingAdvice:
          'Privilégie la gare ou un parking public annoncé par la commune ; en zone bleue, respecte la limite de deux heures et vérifie la signalisation du jour.',
        bestTime: 'Matin ou fin d’après-midi, avec horaires de retour et vent vérifiés',
      },
    },
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
      'Une sortie urbaine et littorale à construire depuis un départ rapproché, entre Vieux-Port, Catalans et Corniche, sans supposer une piste continue jusqu’au Prado.',
    tips: [
      'Rejoins Marseille avec un retour alternatif confirmé, puis utilise le Vieux-Port comme point de départ local.',
      'Choisis avant de partir entre une boucle courte vers les Catalans ou une extension vers le vallon des Auffes et la Corniche.',
      'Ralentis fortement autour du Vieux-Port, des plages et des secteurs piétons très fréquentés.',
      'Vérifie la circulation, les événements et le vent avant d’allonger la sortie vers le Prado.',
    ],
    latitude: 43.2965,
    longitude: 5.3698,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Le Vieux-Port permet de construire une sortie très différente des parcours autour d’Aix, mais les trente kilomètres indicatifs à l’aller excluent une boucle simple avec une autonomie courante. Le point de départ réaliste se situe à Marseille, après un trajet en train, en voiture ou avec une autre solution de retour déjà confirmée.',
        'Depuis le port, plusieurs objectifs sont possibles : rejoindre les Catalans pour une boucle courte, poursuivre vers le vallon des Auffes ou prolonger sur la Corniche. Les pages officielles consultées signalent des aménagements cyclables sur ces secteurs, sans pour autant garantir une continuité protégée sur tout le littoral.',
        'La valeur de cette sortie tient au choix du bon périmètre. Fixe une limite avant de partir, garde une réserve pour le retour au point de départ local et accepte de marcher dans les zones denses plutôt que de chercher à maintenir une allure continue.',
      ],
      profile: {
        environment: 'Centre portuaire dense, front de mer, plages urbaines, anses et points de vue sur la rade de Marseille.',
        terrain: 'Voirie urbaine, carrefours, portions cyclables localisées et sections partagées avec voitures ou piétons.',
        travelStyle: 'Journée avec départ rapproché : rejoindre Marseille autrement, puis réaliser une boucle littorale dimensionnée à la batterie.',
        bestFor: 'Une ambiance urbaine et maritime, avec un itinéraire court choisi à l’avance plutôt qu’une longue traversée improvisée.',
      },
      routeSections: [
        {
          title: 'Vieux-Port et sortie du centre',
          text: 'Le Vieux-Port est un repère pratique, mais aussi un espace très fréquenté. Repère le sens de circulation, les zones piétonnes et les événements du jour avant de partir vers le sud.',
        },
        {
          title: 'Catalans et vallon des Auffes',
          text: 'Cette portion permet une sortie littorale plus compacte. Les abords de plage et les accès au vallon peuvent être denses ou étroits : descends de la trottinette lorsque la cohabitation devient difficile.',
        },
        {
          title: 'Corniche et extension vers le Prado',
          text: 'Une piste cyclable d’environ deux kilomètres est documentée entre les Catalans et le Prado, mais elle ne transforme pas l’ensemble du trajet en axe protégé. Le vent, les carrefours et la fréquentation doivent guider le point de demi-tour.',
        },
      ],
      access: [
        'Prévois un départ rapproché et un retour confirmé : la distance depuis Aix ne correspond pas à une sortie simple en trottinette.',
        'Avant de quitter le Vieux-Port, enregistre ton point d’arrivée et l’horaire limite de retour vers la gare ou le stationnement choisi.',
        'Consulte les informations de circulation de la Ville et les événements locaux susceptibles de modifier les accès au centre ou à la Corniche.',
      ],
      watchOutFor: [
        'Circulation dense et nombreux carrefours dès que l’aménagement cyclable s’interrompt.',
        'Forte fréquentation piétonne autour du Vieux-Port, des plages, des terrasses et des accès au vallon des Auffes.',
        'Vent littoral pouvant augmenter la consommation et rendre le retour plus exigeant.',
        'Recharge à vérifier : elle ne doit pas remplacer un horaire de retour ou une autonomie suffisante.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès de l’Office de tourisme et de la Ville de Marseille. Les travaux, événements, aménagements et conditions de circulation peuvent évoluer.',
      sources: [
        {
          label: 'Office de tourisme de Marseille — Pistes cyclables',
          url: 'https://www.marseille-tourisme.com/organisez-votre-sejour/acces-et-infos-pratiques/se-deplacer/pistes-cyclables-marseille/',
        },
        {
          label: 'Office de tourisme de Marseille — Corniche Kennedy',
          url: 'https://www.marseille-tourisme.com/decouvrez-marseille/culture-et-patrimoine/sites-et-monuments/la-corniche-kennedy/',
        },
        {
          label: 'Ville de Marseille — Circulation et stationnement',
          url: 'https://www.marseille.fr/deplacements/circulation-et-stationnement',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Départ local depuis le Vieux-Port, puis boucle à limiter aux Catalans, au vallon des Auffes ou à une portion de la Corniche selon la batterie, le vent et la circulation.',
        cyclingInfrastructure: {
          status: 'partial',
          label: 'Aménagements partiels sur le littoral',
          notes:
            'Des pistes existent autour du Vieux-Port et sur une partie de la Corniche, mais les sources ne permettent pas de garantir une continuité protégée sur toute la sortie.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Circulation, carrefours, piétons et ruptures d’aménagement imposent une allure basse, un itinéraire court et des passages à pied dans les zones denses.',
        },
        parkingAdvice:
          'Choisis à l’avance une gare ou un stationnement autorisé comme point d’ancrage et ne laisse pas la trottinette sans surveillance sur le Vieux-Port ou les plages.',
        bestTime: 'Matin ou période creuse, après vérification du vent, de la circulation et des événements',
      },
    },
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
      'Une destination de colline à préparer pour son vieux village perché, ses calades et son panorama, avec une arrivée qui se termine plus naturellement à pied.',
    tips: [
      'Garde une marge pour la montée finale et le retour vers Aix, surtout avec du vent.',
      'Repère une arrivée en périphérie du vieux village plutôt que de chercher à rouler dans les calades.',
      'Visite les ruelles et les abords du château à pied : plusieurs passages sont pavés, étroits ou en escalier.',
      'Ne combine pas automatiquement le village et l’aqueduc de Roquefavour, qui demandent deux approches distinctes.',
    ],
    latitude: 43.5527,
    longitude: 5.2938,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Ventabren offre un vrai changement d’échelle à l’ouest d’Aix : on quitte l’environnement urbain pour une commune étendue, puis un village ancien regroupé sur une colline. La distance indicative place déjà la sortie dans une logique de demi-journée avec marge.',
        'La visite se concentre autour de la Grand’Rue, des calades, de la place de l’église et des ruines du château de la Reine Jeanne. Ces rues pavées et souvent en escalier font du vieux centre une destination à parcourir à pied, pas un circuit roulant à tout prix.',
        'L’aqueduc de Roquefavour appartient bien au territoire de Ventabren, mais il se situe à l’écart du village. L’ajouter le même jour change le trajet, le temps et la batterie : mieux vaut le traiter comme une extension séparée à recalculer.',
      ],
      profile: {
        environment: 'Plaine résidentielle et agricole à l’approche, puis vieux village perché, calades, fontaines et panorama vers l’étang de Berre.',
        terrain: 'Approche routière suivie d’une montée vers le village ; rues pavées, étroites et parfois en escalier dans le centre ancien.',
        travelStyle: 'Demi-journée village : rejoindre une entrée lisible, poursuivre à pied dans le centre et garder de l’énergie pour le retour.',
        bestFor: 'Patrimoine, panorama et ambiance provençale sans viser une destination littorale très éloignée.',
      },
      routeSections: [
        {
          title: 'Approche depuis Aix',
          text: 'Le choix de route compte davantage que la ligne droite affichée sur la carte. Compare l’itinéraire vélo proposé, évite les grands axes lorsque l’alternative est plus lisible et conserve une réserve pour la montée finale.',
        },
        {
          title: 'Entrée du vieux village',
          text: 'Cherche un point d’arrêt autorisé avant les ruelles les plus étroites. La Grand’Rue monte en calade vers la place de l’église et se visite plus sereinement à pied avec la trottinette tenue à la main.',
        },
        {
          title: 'Moulin, château et panorama',
          text: 'Les abords du moulin et des ruines prolongent la visite en hauteur. Vérifie la signalisation locale et n’engage pas une descente tardive sans éclairage ni batterie suffisante.',
        },
      ],
      access: [
        'Ventabren est une commune étendue : vérifie que la destination cartographique vise bien le vieux village et non un quartier bas.',
        'Choisis un arrêt périphérique légal et visible, puis termine la visite à pied dans les calades.',
        'Si tu prolonges vers un espace naturel ou l’Arbois entre juin et septembre, consulte les conditions quotidiennes d’accès aux massifs.',
      ],
      watchOutFor: [
        'Montée finale et retour plus énergivore que ne le suggère la seule distance.',
        'Rues pavées, escaliers et espaces étroits du centre ancien, peu adaptés à une circulation continue.',
        'Vent possible sur les secteurs ouverts et exposition au soleil sur l’approche.',
        'Recharge à vérifier : ne compte pas sur une prise au village pour sécuriser le retour.',
      ],
      verificationNote:
        'Informations vérifiées à distance à partir des pages de la Commune de Ventabren et de la réglementation préfectorale des massifs. Le trajet routier et le stationnement restent à confirmer le jour du départ.',
      sources: [
        {
          label: 'Commune de Ventabren — Tourisme et vieux village',
          url: 'https://www.ventabren.fr/vivre-decouvrir/tourisme/',
        },
        {
          label: 'Commune de Ventabren — Patrimoine',
          url: 'https://www.ventabren.fr/vivre-decouvrir/patrimoine/',
        },
        {
          label: 'Préfecture des Bouches-du-Rhône — Accès aux massifs',
          url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche routière vers le vieux village, arrêt en périphérie puis visite à pied des calades, de la place de l’église et des abords du château. Roquefavour constitue une extension séparée.',
        cyclingInfrastructure: {
          status: 'unknown',
          label: 'Continuité à confirmer',
          notes:
            'Aucune source officielle consultée ne confirme une voie cyclable continue entre Aix et le vieux village de Ventabren.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'L’approche routière, la montée finale et les calades imposent un itinéraire vérifié, une allure modérée et une fin de visite à pied.',
        },
        parkingAdvice:
          'Arrête-toi sur un emplacement autorisé en périphérie du centre ancien et garde la trottinette avec toi pendant la visite des ruelles.',
        bestTime: 'Matin ou fin d’après-midi, avec assez de jour pour le retour',
      },
    },
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
      'Une approche courte vers Le Tholonet, suivie d’une découverte pédestre exigeante vers le barrage Zola, à distinguer d’un itinéraire continu en trottinette.',
    tips: [
      'Utilise le parking des Infernets comme repère de départ pédestre si la signalisation du jour l’autorise.',
      'La boucle officielle vers Zola et Bimont annonce environ 9 km et 400 m de dénivelé : ne la confonds pas avec la distance d’approche.',
      'Prévois de l’eau, des chaussures adaptées et un retour avant la chaleur plutôt qu’une recharge sur place.',
      'Entre juin et septembre, consulte impérativement les conditions préfectorales d’accès au massif.',
    ],
    latitude: 43.5169,
    longitude: 5.5258,
    rechargeStatus: 'none',
    editorial: {
      introduction: [
        'Le Tholonet est proche d’Aix, mais le lac Zola ne se résume pas aux huit kilomètres indicatifs d’approche. La sortie combine une route vers le village et une découverte du massif dont le relief, les chemins et les règles d’accès changent complètement l’effort réel.',
        'Le Grand Site décrit une randonnée au départ du parking des Infernets vers les barrages Zola et Bimont, avec environ neuf kilomètres, trois heures et quatre cents mètres de dénivelé. Cette référence permet de préparer la partie pédestre ; elle ne constitue pas une autorisation de parcourir les sentiers en trottinette.',
        'La formule la plus lisible consiste à rejoindre Le Tholonet ou le parking autorisé, sécuriser la trottinette sans la laisser isolée, puis choisir une marche adaptée au temps et à la chaleur. Une visite courte du village reste une alternative si le massif est fermé ou si la batterie est limite.',
      ],
      profile: {
        environment: 'Village du Tholonet, route Cézanne, garrigue, vallons et patrimoine hydraulique au pied de Sainte-Victoire.',
        terrain: 'Approche routière vallonnée, puis randonnée avec descentes raides, remontées et passages non adaptés à une trottinette urbaine.',
        travelStyle: 'Sortie mixte : trajet d’approche, arrêt au Tholonet ou aux Infernets, puis découverte à pied selon les accès.',
        bestFor: 'Associer patrimoine, paysage et marche sans présenter le tour des barrages comme une boucle roulante facile.',
      },
      routeSections: [
        {
          title: 'Approche du Tholonet',
          text: 'La route depuis Aix rejoint un secteur fréquenté et vallonné. Vérifie le trajet proposé, garde une marge pour le retour et ne suppose pas qu’un bas-côté ou un aménagement cyclable accompagne toute l’approche.',
        },
        {
          title: 'Parking des Infernets et départ pédestre',
          text: 'Le parking des Infernets est le départ documenté par le Grand Site. Lis les panneaux à l’arrivée et considère ce point comme la fin de la partie roulante si les chemins ne sont pas explicitement autorisés.',
        },
        {
          title: 'Barrage Zola et extension vers Bimont',
          text: 'La randonnée descend vers Zola puis remonte fortement vers Bimont. Les pentes, les chemins et la durée rendent cette extension incompatible avec une simple estimation d’autonomie basée sur la route.',
        },
      ],
      access: [
        'Le parking des Infernets est le départ officiel de la randonnée vers les barrages ; vérifie sa disponibilité et la signalisation locale le jour même.',
        'Dans le village, certaines zones de stationnement sont limitées dans le temps : le disque et les panneaux sur place font foi.',
        'Du 1er juin au 30 septembre, consulte la carte préfectorale quotidienne avant toute entrée dans le massif.',
      ],
      watchOutFor: [
        'Relief nettement plus exigeant sur la partie pédestre que ne l’indique la distance depuis Aix.',
        'Descente abrupte, chemin bétonné et remontées signalées sur la boucle officielle vers Zola et Bimont.',
        'Réseau mobile incertain, chaleur et absence de recharge connue dans le secteur naturel.',
        'Baignade interdite dans les retenues et accès susceptible d’être fermé en période de risque incendie.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès du Grand Site Concors Sainte-Victoire, de la Commune du Tholonet et de la Préfecture. Accès, stationnement et état des chemins restent à confirmer sur place.',
      sources: [
        {
          label: 'Grand Site Concors Sainte-Victoire — Le Tholonet, Zola et Bimont',
          url: 'https://www.grandsitesaintevictoire.com/le-tholonet-barrages-zola-et-bimont/',
        },
        {
          label: 'Commune du Tholonet — Stationnement',
          url: 'https://letholonet.fr/environnement/mobilite/stationnement/',
        },
        {
          label: 'Préfecture des Bouches-du-Rhône — Accès aux massifs',
          url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche routière jusqu’au Tholonet ou au parking des Infernets, puis découverte pédestre du barrage Zola. L’extension vers Bimont relève d’une randonnée exigeante distincte.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Approche routière, sentiers pédestres',
          notes:
            'Aucune source officielle consultée ne confirme une continuité cyclable vers Zola ni l’autorisation de rouler sur la boucle de randonnée.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Circulation d’approche, relief, fortes descentes et règles du massif imposent de séparer clairement trajet en trottinette et randonnée à pied.',
        },
        parkingAdvice:
          'Vérifie les places et limitations au village ou aux Infernets ; n’abandonne pas la trottinette sans surveillance pendant la randonnée.',
        bestTime: 'Matin, hors forte chaleur et après confirmation de l’ouverture du massif',
      },
    },
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
  const detailOverrides = spot.editorial?.detailOverrides;
  const cyclingInfrastructure =
    detailOverrides?.cyclingInfrastructure ?? cyclingInfrastructureForRouteType(routeType);
  const roadSafety = detailOverrides?.roadSafety ?? roadSafetyForRouteType(routeType);

  return {
    ...spot,
    address: `${spot.name}, ${destinationLabels[spot.area]}`,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${spot.latitude},${spot.longitude}`,
    routeNotes: detailOverrides?.routeNotes ?? routeNotesForRouteType(routeType),
    cyclingInfrastructure,
    roadSafety,
    parkingAdvice: detailOverrides?.parkingAdvice ?? parkingAdviceForRouteType(routeType),
    bestTime: detailOverrides?.bestTime ?? bestTimeForSpot(spot),
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
