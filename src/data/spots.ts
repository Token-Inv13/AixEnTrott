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
      'Une micro-sortie au sud du centre : approche urbaine très courte, pause sous les tilleuls et retour facile sans entamer fortement la batterie.',
    tips: [
      'Rejoins une entrée puis marche dans le parc lorsque les allées sont fréquentées.',
      'Vérifie l’horaire de fermeture, qui varie selon le mois.',
      'Utilise cette halte comme départ vers le quartier Mazarin plutôt que comme boucle sportive.',
    ],
    latitude: 43.5219,
    longitude: 5.4463,
    rechargeStatus: 'nearby',
    editorial: {
      introduction: [
        'Parc Jourdan est une sortie de proximité assumée : quelques rues depuis le centre d’Aix, une pause dans un parc de quatre hectares, puis un retour sans logistique lourde. Son intérêt tient davantage à sa simplicité qu’au nombre de kilomètres.',
        'L’entrée principale se situe rue Anatole-France, avec d’autres accès avenue Jules-Ferry, avenue Robert-Schuman et Camin d’Oc. L’allée de tilleuls, le miroir d’eau et l’escalier monumental composent une halte agréable, mais le parc reste un espace partagé avec promeneurs, familles et événements ponctuels.',
        'La bonne pratique consiste à rejoindre l’entrée la plus adaptée à son point de départ, puis à circuler à pied dans les allées lorsque la fréquentation l’exige. Les horaires municipaux changent au fil des saisons et doivent être consultés avant une sortie tardive.',
      ],
      profile: {
        environment: 'Parc urbain de quatre hectares au sud du centre, structuré par une allée de tilleuls, un miroir d’eau et des pelouses.',
        terrain: 'Approche urbaine courte, puis allées de parc à parcourir lentement ou à pied selon l’affluence.',
        travelStyle: 'Micro-sortie avec pause : aller direct, temps calme dans le parc et retour par le centre ou le quartier Mazarin.',
        bestFor: 'Une coupure de 30 à 90 minutes, une fin de journée avec peu d’autonomie ou un point de rendez-vous central.',
      },
      routeSections: [
        {
          title: 'Choisir son entrée',
          text: 'L’accès rue Anatole-France est le repère principal. Les entrées Jules-Ferry, Robert-Schuman et Camin d’Oc peuvent éviter de contourner le parc selon le quartier de départ.',
        },
        {
          title: 'Faire une vraie pause',
          text: 'L’allée basse mène au miroir d’eau, puis l’escalier relie les parties basse et haute. Ce cheminement court se prête mieux à la marche et à l’observation qu’à une traversée rapide.',
        },
        {
          title: 'Prolonger sans forcer',
          text: 'Pour ajouter un peu de ville, repars vers le quartier Mazarin ou le cours Mirabeau. Garde toutefois le parc comme halte centrale, pas comme piste de circulation.',
        },
      ],
      access: [
        'Le parc se trouve à environ quinze minutes à pied du centre selon la Ville ; l’approche en trottinette est donc très courte.',
        'Les horaires vont d’une fermeture à 17 h en hiver jusqu’à 20 h 30 en juin et juillet ; vérifie le mois en cours avant le départ.',
      ],
      watchOutFor: [
        'Allées partagées et fréquentation familiale : descends de la trottinette dès que la cohabitation devient serrée.',
        'Fermeture quotidienne variable selon la saison, sans accès nocturne à supposer.',
        'Manifestations estivales possibles, avec accès ou circulation interne susceptibles d’être adaptés.',
      ],
      verificationNote:
        'Informations vérifiées à distance sur les pages de la Ville d’Aix-en-Provence. Les horaires affichés aux entrées et les consignes liées aux événements restent prioritaires.',
      sources: [
        {
          label: 'Ville d’Aix-en-Provence — Parc Jourdan',
          url: 'https://www.aixenprovence.fr/Parc-Jourdan',
        },
        {
          label: 'Ville d’Aix-en-Provence — Se déplacer à pied',
          url: 'https://www.aixenprovence.fr/Se-deplacer-a-pied',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche urbaine vers l’une des quatre entrées, puis pause à pied dans le parc. Prolongement possible vers le quartier Mazarin selon le temps disponible.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Approche urbaine, parc partagé',
          notes:
            'Aucune continuité cyclable interne n’est annoncée par la Ville ; les allées doivent être abordées comme un espace de promenade fréquenté.',
        },
        roadSafety: {
          level: 'easy',
          notes:
            'La distance est faible, mais les carrefours du centre et la présence de piétons demandent une allure lente et des passages à pied.',
        },
        parkingAdvice:
          'Garde la trottinette avec toi pendant la pause et respecte les consignes affichées ; ne bloque ni portail ni cheminement.',
        bestTime: 'En journée ou en fin d’après-midi, assez tôt avant la fermeture saisonnière',
      },
    },
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
      'Une courte traversée patrimoniale du centre ancien, avec la place d’Albertas comme halte architecturale plutôt que comme destination à parcourir en roulant.',
    tips: [
      'Entre dans les rues les plus denses à pied et laisse toujours la priorité aux piétons.',
      'Relie la place à la Rotonde ou au cours Mirabeau pour former une boucle très courte.',
      'Choisis une heure calme pour mieux voir les façades sans gêner les passants.',
    ],
    latitude: 43.5293,
    longitude: 5.4476,
    rechargeStatus: 'nearby',
    editorial: {
      introduction: [
        'La place d’Albertas donne un objectif précis à une sortie dans le Vieil Aix : rejoindre un ensemble baroque du XVIIIe siècle, observer la fontaine et poursuivre à pied dans les rues du centre. La distance est minime, mais la densité piétonne compte davantage que l’autonomie.',
        'La place fut aménagée face à l’hôtel d’Albertas à partir des années 1730. Sa fontaine à vasque de fonte date de 1912. Ces repères patrimoniaux justifient une halte attentive, sans chercher à transformer les ruelles voisines en parcours rapide.',
        'Cette fiche convient surtout à une boucle urbaine souple : approche jusqu’aux abords du centre ancien, marche sur les secteurs les plus fréquentés, puis retour par le cours Mirabeau ou la Rotonde. Les restrictions de circulation et les événements locaux restent à vérifier sur place.',
      ],
      profile: {
        environment: 'Cœur historique dense, place baroque, fontaine et rues commerçantes autour de la rue Espariat.',
        terrain: 'Revêtements urbains et ruelles étroites, avec de nombreux secteurs où la marche est le choix le plus prudent.',
        travelStyle: 'Flânerie patrimoniale : courte approche, visite à pied et boucle adaptable autour du centre.',
        bestFor: 'Une sortie spontanée de moins de deux heures, une halte photo ou une découverte du Vieil Aix avec peu de batterie.',
      },
      routeSections: [
        {
          title: 'Depuis la Rotonde',
          text: 'La rue Espariat constitue un axe naturel vers la place. Anticipe toutefois la fréquentation commerciale et termine l’approche à pied dès que l’espace se resserre.',
        },
        {
          title: 'Place et fontaine d’Albertas',
          text: 'Prends le temps d’observer l’ordonnance des façades et la fontaine centrale. L’hôtel est une propriété privée : la sortie concerne l’espace public, pas une visite intérieure.',
        },
        {
          title: 'Boucle dans le Vieil Aix',
          text: 'Poursuis à pied vers les places voisines ou reviens par le cours Mirabeau. Le tracé doit rester flexible selon les marchés, terrasses, livraisons et événements.',
        },
      ],
      access: [
        'Vise les abords de la rue Espariat plutôt qu’un arrêt au milieu de la place, afin de ne pas gêner les cheminements.',
        'Le centre ancien se prête à une arrivée depuis la Rotonde ; adapte la fin du trajet aux zones piétonnes et à la signalisation du jour.',
      ],
      watchOutFor: [
        'Forte densité de piétons, terrasses et passages étroits dans le centre historique.',
        'Pavés, ressauts et mobilier urbain pouvant rendre la progression inconfortable.',
        'Accès modifiés lors de marchés, travaux ou manifestations : ne suppose pas un passage permanent.',
      ],
      verificationNote:
        'Le contexte patrimonial a été vérifié sur les pages de la Ville d’Aix-en-Provence. Les règles de circulation, travaux et événements doivent être confirmés sur la signalisation locale.',
      sources: [
        {
          label: 'Ville d’Aix-en-Provence — Place Albertas',
          url: 'https://www.aixenprovence.fr/Place-Albertas',
        },
        {
          label: 'Ville d’Aix-en-Provence — Fontaine d’Albertas',
          url: 'https://www.aixenprovence.fr/Fontaine-d-Albertas',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Courte approche vers la rue Espariat, halte place d’Albertas puis boucle pédestre dans le Vieil Aix. Le tracé final dépend de l’affluence et des restrictions locales.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Centre ancien principalement piéton',
          notes:
            'La fiche ne suppose aucune voie dédiée dans les ruelles ; la progression à pied est à privilégier autour de la place.',
        },
        roadSafety: {
          level: 'easy',
          notes:
            'Peu de distance, mais une cohabitation dense avec les piétons et des revêtements irréguliers imposent une allure très basse.',
        },
        parkingAdvice:
          'Ne laisse pas la trottinette au milieu de la place ; garde-la avec toi ou utilise un point d’attache autorisé sans gêner les façades et passages.',
        bestTime: 'Le matin ou en début de soirée, hors forte affluence et événements',
      },
    },
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
      'Une approche courte vers un site archéologique à visiter à pied, avec horaires d’ouverture précis et arrivée routière à préparer au nord d’Aix.',
    tips: [
      'Vérifie les jours d’ouverture avant de partir : le site n’est pas accessible tous les jours.',
      'Utilise l’arrêt Entremont ou l’adresse officielle comme repère d’arrivée.',
      'Prévois la visite du site à pied et une attache autorisée pour la trottinette.',
    ],
    latitude: 43.5599,
    longitude: 5.4617,
    rechargeStatus: 'none',
    editorial: {
      introduction: [
        'L’oppidum d’Entremont offre une vraie destination patrimoniale à environ trois kilomètres au nord du vieux centre selon le ministère de la Culture. L’approche reste courte, mais l’arrivée près de l’A51 et de la route de Puyricard demande davantage de préparation qu’une sortie dans un parc urbain.',
        'Le site archéologique se visite à des jours et horaires précis. Une fois arrivé au 960 avenue Fernand-Benoit, la découverte doit être pensée comme une visite à pied : vestiges, parcours en étapes et lecture du paysage, sans présumer d’une circulation en trottinette sur l’oppidum.',
        'La sortie fonctionne bien sur une ou deux heures si l’on confirme l’ouverture avant le départ. Le musée Granet conserve par ailleurs des objets découverts à Entremont, ce qui permet de prolonger le thème lors d’une autre visite dans le centre d’Aix.',
      ],
      profile: {
        environment: 'Plateau archéologique au nord d’Aix, à proximité d’axes routiers importants et avec vues sur le territoire aixois.',
        terrain: 'Approche urbaine puis routière, suivie d’un parcours de visite extérieur à effectuer à pied.',
        travelStyle: 'Sortie patrimoniale cadrée par les horaires : rejoindre l’entrée, sécuriser la trottinette et prendre le temps de la visite.',
        bestFor: 'Un week-end culturel, une découverte archéologique proche d’Aix ou une sortie courte avec objectif précis.',
      },
      routeSections: [
        {
          title: 'Quitter le centre par le nord',
          text: 'Prépare l’approche vers l’avenue Fernand-Benoit en contrôlant les carrefours et le type de voie proposé. La proximité de l’échangeur impose de ne pas suivre aveuglément un itinéraire inadapté.',
        },
        {
          title: 'Arrivée à Entremont',
          text: 'L’adresse officielle et l’arrêt de bus Entremont sont de meilleurs repères qu’un point approximatif sur le plateau. Vérifie sur place où stationner sans gêner l’accueil.',
        },
        {
          title: 'Visite archéologique',
          text: 'Le ministère recommande une visite en dix étapes. Parcours le site à pied, respecte les vestiges et garde une marge de temps avant la fermeture.',
        },
      ],
      access: [
        'Adresse officielle : 960 avenue Fernand-Benoit, 13090 Aix-en-Provence ; arrêt de bus Entremont indiqué par le ministère.',
        'Ouverture annoncée les lundi, mercredi, jeudi, vendredi, le premier week-end du mois et certains week-ends patrimoniaux ; horaires et dates à recontrôler avant le départ.',
      ],
      watchOutFor: [
        'Approche proche de l’A51 et de la D14 : refuse tout segment non autorisé ou manifestement inadapté aux engins de déplacement personnel.',
        'Site fermé certains jours et lors de plusieurs jours fériés.',
        'Visite extérieure exposée au soleil et au vent, avec peu d’intérêt à rouler une fois l’entrée atteinte.',
        'Aucune recharge connue sur place à considérer comme acquise.',
      ],
      verificationNote:
        'Accès et horaires vérifiés à distance sur le site officiel du ministère de la Culture. Confirme l’ouverture par le contact du site et respecte les consignes de l’agent d’accueil.',
      sources: [
        {
          label: 'Ministère de la Culture — Informations pratiques de l’oppidum d’Entremont',
          url: 'https://archeologie.culture.gouv.fr/entremont/fr/informations-pratiques-0',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche vers le 960 avenue Fernand-Benoit en évitant les voies interdites, puis visite pédestre du site archéologique pendant les horaires d’ouverture.',
        cyclingInfrastructure: {
          status: 'unknown',
          label: 'Approche à vérifier, visite pédestre',
          notes:
            'La source officielle décrit l’accès routier et en bus, sans confirmer de continuité cyclable ni de circulation en trottinette sur le site.',
        },
        roadSafety: {
          level: 'moderate',
          notes:
            'La faible distance ne supprime pas le risque lié aux grands axes et échangeurs proches ; contrôle chaque segment de l’approche.',
        },
        parkingAdvice:
          'Demande à l’accueil où garder ou attacher la trottinette et ne la laisse pas contre les vestiges ni sur le parcours de visite.',
        bestTime: 'Le matin pendant un jour d’ouverture confirmé, hors forte chaleur',
      },
    },
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
      'Une approche préparée vers un parc départemental accidenté de Sainte-Victoire, à découvrir ensuite selon les itinéraires ouverts et la réglementation du massif.',
    tips: [
      'Définis un point d’arrivée précis avant de partir : le domaine couvre plusieurs communes et accès.',
      'Ne franchis jamais les limites de la réserve naturelle nationale interdite au public.',
      'Consulte l’accès aux massifs en été et renonce en cas de fermeture, vent fort ou chaleur excessive.',
      'Sépare l’approche routière en trottinette de toute randonnée à pied ou VTT autorisée sur place.',
    ],
    latitude: 43.5269,
    longitude: 5.5868,
    rechargeStatus: 'none',
    editorial: {
      introduction: [
        'Roques-Hautes n’est pas un simple prolongement de Bimont. Le parc départemental s’étend sur 800 hectares de relief accidenté entre cinq communes du versant sud de Sainte-Victoire ; une destination précise et un plan de retour sont donc indispensables.',
        'Le Département mentionne des sentiers pédestres et VTT de difficultés variées, mais cette information ne vaut pas autorisation générale pour une trottinette électrique. L’usage prudent consiste à rejoindre un accès autorisé par la route, puis à choisir sur place une découverte à pied compatible avec la signalisation.',
        'Le parc inclut la réserve naturelle nationale de Sainte-Victoire, interdite au public. En été, l’ouverture des massifs dépend en outre du niveau de risque incendie. La sortie doit rester annulable jusqu’au dernier contrôle officiel.',
      ],
      profile: {
        environment: 'Grand domaine départemental de garrigue, forêt, crêtes rocheuses et parcelles agricoles sous le versant sud de Sainte-Victoire.',
        terrain: 'Relief accidenté, approche par routes départementales puis sentiers de niveaux variés à traiter séparément.',
        travelStyle: 'Demi-journée préparée : accès routier ciblé, courte découverte pédestre et retour avec une marge batterie importante.',
        bestFor: 'Des utilisateurs autonomes qui veulent un paysage de massif sans confondre route d’approche et pratique dans l’espace naturel.',
      },
      routeSections: [
        {
          title: 'Approche par la RD17',
          text: 'Le Département indique la route Cézanne depuis Aix vers Puyloubier comme accès général. Cette route sinueuse et partagée demande une vigilance constante et ne constitue pas une piste dédiée.',
        },
        {
          title: 'Choisir un accès officiel',
          text: 'Le domaine est vaste. Vise un parking ou point d’information clairement identifié plutôt qu’un repère au milieu du massif, puis lis les panneaux avant de poursuivre.',
        },
        {
          title: 'Découverte du parc',
          text: 'Les itinéraires pédestres et VTT ne sont ni de difficulté uniforme ni automatiquement ouverts à une trottinette. Continue à pied sauf indication locale explicite et reste hors de la réserve interdite.',
        },
      ],
      access: [
        'Accès général publié par le Département : RD17 route Cézanne depuis Aix en direction de Puyloubier.',
        'La Maison Sainte-Victoire à Saint-Antonin-sur-Bayon fournit informations et repères ; vérifie ses horaires avant de la choisir comme point d’appui.',
        'Du 1er juin au 30 septembre, consulte le niveau d’accès officiel aux massifs la veille au soir et le jour du départ.',
      ],
      watchOutFor: [
        'Réserve naturelle nationale incluse dans le domaine mais interdite au public.',
        'Relief accidenté, routes sinueuses et absence de continuité cyclable confirmée depuis Aix.',
        'Fermeture possible pour risque incendie ou conditions météo défavorables.',
        'Baignade interdite dans les points d’eau du parc et aucune recharge à considérer comme disponible.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès du Département et de la Préfecture. Les limites, itinéraires autorisés et conditions d’ouverture affichés sur place priment sur cette préparation.',
      sources: [
        {
          label: 'Département des Bouches-du-Rhône — Parc de Roques-Hautes',
          url: 'https://www.departement13.fr/vivre-en-provence/espaces-naturels/parcs-et-domaines/les-parcs/parc-de-roques-hautes',
        },
        {
          label: 'Préfecture des Bouches-du-Rhône — Accès aux massifs',
          url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Approche routière ciblée par la RD17 vers un accès officiel du parc, puis découverte à pied selon les panneaux, l’ouverture du massif et les limites de la réserve.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Route partagée, itinéraires naturels réglementés',
          notes:
            'Les sentiers VTT cités par le Département ne prouvent ni une continuité depuis Aix ni une autorisation pour les trottinettes électriques.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Distance, relief, circulation sur la RD17 et exposition aux conditions du massif imposent une préparation complète et un retour alternatif envisageable.',
        },
        parkingAdvice:
          'Utilise seulement un parking officiel ouvert, lis les panneaux de réglementation et ne laisse pas la trottinette isolée pendant une marche.',
        bestTime: 'Tôt le matin, hors forte chaleur et après confirmation officielle de l’ouverture',
      },
    },
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
      'Une base de loisirs lisible pour un départ local ou combiné, avec sentier de quatre kilomètres, règles internes précises et forte fréquentation estivale.',
    tips: [
      'Traite la distance depuis Aix comme indicative et conserve une solution de retour avant de partir.',
      'Stationne à l’emplacement prévu puis vérifie les règles applicables aux engins électriques à l’entrée.',
      'Évite la plage et les aires de jeux en roulant, même si d’autres zones du site sont ouvertes aux cycles.',
      'En été, anticipe le parking payant, la chaleur et l’affluence autour de la baignade.',
    ],
    latitude: 43.6489,
    longitude: 5.5869,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Le lac de Peyrolles est une base de loisirs métropolitaine de 78 hectares, aménagée autour d’un plan d’eau avec plage, jeux, pique-nique et sentier de quatre kilomètres. Cette organisation rend la destination facile à comprendre une fois sur place, mais pas nécessairement simple à rejoindre intégralement depuis Aix en trottinette.',
        'Le règlement distingue les espaces et les usages : les véhicules à moteur sont interdits dans la base, les vélos ne doivent pas circuler sur la plage ni dans les aires de jeux, et le stationnement se fait sur le parking aménagé. Une trottinette électrique ne doit donc pas être assimilée automatiquement à un engin autorisé sur le tour du lac.',
        'Le scénario réaliste est un départ local ou combiné, puis une visite à pied après avoir sécurisé la trottinette. En juillet et août, la baignade surveillée, les activités et le parking payant augmentent fortement la fréquentation ; hors saison, l’ambiance est plus calme mais les services peuvent être réduits.',
      ],
      profile: {
        environment: 'Base de loisirs autour d’un lac issu d’une ancienne carrière, avec plage, équipements sportifs, jeux et zones de pique-nique.',
        terrain: 'Accès routier à préparer, parking aménagé puis cheminements plats autour du plan d’eau, soumis au règlement du site.',
        travelStyle: 'Sortie combinée ou départ local : rejoindre le parking, marcher autour du lac et profiter des équipements disponibles selon la saison.',
        bestFor: 'Une demi-journée au bord de l’eau, une sortie familiale préparée ou une pause nature sans randonnée technique.',
      },
      routeSections: [
        {
          title: 'Rejoindre la base',
          text: 'Vise la route de la Durance et le parking officiel. Pour un départ depuis Aix, compare la distance réelle, le relief et l’autonomie plutôt que de te fier au seul repère kilométrique de la fiche.',
        },
        {
          title: 'Parking et entrée',
          text: 'Le stationnement doit rester dans l’aire aménagée. À l’entrée, consulte le règlement à jour et demande confirmation avant toute circulation avec un engin électrique.',
        },
        {
          title: 'Tour du lac',
          text: 'La Métropole annonce un sentier de quatre kilomètres. Parcours-le à pied si l’autorisation de la trottinette n’est pas explicitement confirmée, en restant éloigné des plages et aires de jeux.',
        },
      ],
      access: [
        'Adresse de repère : route de la Durance, RD62, 13860 Peyrolles-en-Provence.',
        'Le parking est annoncé payant en juillet et août de 9 h à 18 h et gratuit le reste de l’année ; tarifs et horaires peuvent évoluer.',
        'La base est ouverte toute l’année, mais les activités, la surveillance de baignade et les services sont saisonniers.',
      ],
      watchOutFor: [
        'Berges parfois abruptes et profondeurs importantes près du bord sur le site d’une ancienne carrière.',
        'Véhicules motorisés interdits dans la base et règles spécifiques pour les cycles ; statut des trottinettes électriques à confirmer sur place.',
        'Chiens, camping et barbecues interdits selon le règlement publié.',
        'Affluence estivale, chaleur et parking non surveillé à intégrer dans la préparation.',
      ],
      verificationNote:
        'Équipements et règlement vérifiés à distance sur les documents de la Métropole. La signalisation, les zones autorisées et les conditions saisonnières doivent être recontrôlées à l’arrivée.',
      sources: [
        {
          label: 'Métropole Aix-Marseille-Provence — Lac de Peyrolles',
          url: 'https://ampmetropole.fr/missions/culture-sport-nautisme-et-grands-evenements/equipements-dinteret-metropolitain-sport/lac-de-peyrolles/',
        },
        {
          label: 'Métropole Aix-Marseille-Provence — Règlement intérieur du lac',
          url: 'https://ampmetropole.fr/wp-content/uploads/2024/07/reglement-interieur.pdf',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Accès jusqu’au parking officiel de la base, puis tour du lac à pied sauf autorisation locale explicite pour la trottinette électrique.',
        cyclingInfrastructure: {
          status: 'unknown',
          label: 'Accès à préparer, règlement interne',
          notes:
            'Le règlement traite séparément véhicules motorisés, cycles et engins non motorisés sans confirmer explicitement la circulation des trottinettes électriques.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'La longueur depuis Aix et l’accès routier rendent un départ local ou combiné plus réaliste ; sur place, la priorité va aux piétons et aux règles de la base.',
        },
        parkingAdvice:
          'Utilise le parking aménagé, ne suppose pas qu’il est surveillé et garde une solution sûre pour la trottinette pendant la marche ou la baignade.',
        bestTime: 'Hors pointe estivale, ou tôt le matin avec services et règlement vérifiés',
      },
    },
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
      'Une destination patrimoniale lointaine à organiser comme sortie locale ou combinée, autour du château de l’Empéri, des fontaines et du centre ancien.',
    tips: [
      'Ne pars pas d’Aix sans avoir calculé le trajet réel et fixé une solution de retour.',
      'Compare le train et les cars avant de choisir un départ local depuis la gare de Salon.',
      'Visite le centre historique à pied et garde la trottinette sous surveillance.',
      'Concentre la sortie sur quelques repères plutôt que de multiplier les kilomètres urbains.',
    ],
    latitude: 43.6406,
    longitude: 5.0974,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Salon-de-Provence se situe à environ 35 kilomètres routiers d’Aix selon l’office de tourisme, alors que la distance affichée sur cette fiche reste un repère indicatif. Pour une trottinette, la destination doit donc être préparée comme une journée combinée ou un départ local, pas comme un aller-retour simple.',
        'Le centre historique rassemble le château de l’Empéri, des fontaines, des places et plusieurs circuits patrimoniaux publiés par l’office de tourisme. Une fois à Salon, quelques kilomètres à faible allure suffisent ; l’essentiel de la visite se fait plus confortablement à pied dans les rues centrales.',
        'La ville dispose d’une gare SNCF et d’une halte routière près du parking de la gare. Ces équipements ouvrent des scénarios de retour, mais les horaires, correspondances et conditions de transport de la trottinette doivent être vérifiés pour le jour choisi.',
      ],
      profile: {
        environment: 'Ville provençale structurée autour d’un centre ancien, du château de l’Empéri, de places et de fontaines.',
        terrain: 'Longue liaison interurbaine si elle est tentée depuis Aix, puis centre urbain compact à parcourir lentement ou à pied.',
        travelStyle: 'Journée combinée : transport ou voiture jusqu’à Salon, petite boucle locale et visite patrimoniale pédestre.',
        bestFor: 'Une vraie coupure hors d’Aix, avec logistique de retour déjà réservée ou confirmée.',
      },
      routeSections: [
        {
          title: 'Choisir le bon point de départ',
          text: 'La gare et la halte routière permettent d’envisager un départ local. Si tu pars d’Aix en trottinette, traite le trajet comme une longue liaison préparée et refuse les axes non adaptés.',
        },
        {
          title: 'Centre historique',
          text: 'Depuis la place du Général-de-Gaulle, construis une courte boucle vers le château de l’Empéri et les rues anciennes. Marche dans les secteurs denses et adapte-toi aux marchés et événements.',
        },
        {
          title: 'Retour avant la visite',
          text: 'Confirme le dernier train, car ou conducteur avant de commencer la boucle. Une solution théorique n’est pas un retour garanti, surtout avec une trottinette à transporter.',
        },
      ],
      access: [
        'Salon possède une gare SNCF et une halte routière au parking de la gare ; consulte les horaires officiels et les correspondances du jour.',
        'Le parking Morgan et le parking relais de la gare sont cités par l’office de tourisme parmi les solutions proches du centre.',
        'L’office de tourisme se situe 71 place du Général-de-Gaulle, repère pratique pour commencer une boucle patrimoniale.',
      ],
      watchOutFor: [
        'Distance trop importante pour la présenter comme une sortie simple avec une autonomie de 30 kilomètres.',
        'Aucune acceptation systématique de la trottinette dans un train ou un car ne doit être supposée.',
        'Centre ancien partagé avec piétons, terrasses, marchés et événements temporaires.',
        'Recharge publique à vérifier : ne bâtis pas le retour sur une prise non confirmée.',
      ],
      verificationNote:
        'Accès et repères patrimoniaux vérifiés à distance auprès de l’office de tourisme de Salon-de-Provence. Horaires, correspondances, transport de l’engin et stationnement restent à confirmer.',
      sources: [
        {
          label: 'Office de tourisme de Salon-de-Provence — Comment venir',
          url: 'https://www.visitsalondeprovence.com/mon-sejour/infos-pratiques/comment-venir/',
        },
        {
          label: 'Office de tourisme de Salon-de-Provence — Guide patrimoine',
          url: 'https://www.visitsalondeprovence.com/app/uploads/salon-de-provence/2021/07/guide-patrimoine-2020-compressed.pdf',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Destination longue à traiter comme une sortie combinée ou un départ local depuis la gare, puis boucle compacte et pédestre dans le centre historique.',
        cyclingInfrastructure: {
          status: 'unknown',
          label: 'Liaison longue non qualifiée, boucle urbaine locale',
          notes:
            'Les sources consultées confirment les accès et transports, mais pas une continuité cyclable adaptée depuis Aix.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'La distance interurbaine et les grands axes rendent le départ local ou combiné nettement plus prudent qu’un trajet intégral en trottinette.',
        },
        parkingAdvice:
          'Privilégie les parkings officiels cités par l’office et ne laisse pas la trottinette seule pendant la visite du château ou des musées.',
        bestTime: 'Une journée hors forte chaleur, avec aller et retour confirmés avant le départ',
      },
    },
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
      'Une journée littorale à construire depuis un départ local, la gare ou le parking relais, sans confondre visite du village et accès réglementé aux Calanques.',
    tips: [
      'Privilégie le train, la voiture ou un trajet combiné plutôt qu’un aller-retour intégral depuis Aix.',
      'Utilise le parking relais des Gorguettes et les navettes lorsque la circulation est chargée.',
      'Vérifie le risque incendie et l’état de la route des Crêtes avant toute extension.',
      'Ne suppose pas qu’une piste autorisée aux cycles l’est aussi aux trottinettes électriques.',
    ],
    latitude: 43.214,
    longitude: 5.5371,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Cassis mérite une journée, mais pas un trajet improvisé depuis Aix. La distance, le relief et la circulation rendent plus réaliste une arrivée en train, en voiture ou par transport combiné, suivie d’une boucle locale entre la gare, le village et le port.',
        'Le Parc national recommande les alternatives à la voiture et le parking relais des Gorguettes, avec navettes vers le centre et certains accès. La gare SNCF est distincte du cœur de ville : vérifie la liaison locale, les horaires et les conditions de transport de la trottinette avant de compter sur le train.',
        'Le village, le port et les abords urbains ne doivent pas être confondus avec les sentiers des Calanques. Du 1er juin au 30 septembre, l’accès au massif peut être interdit pour risque incendie ; la route des Crêtes peut également fermer en cas de vent ou de niveau de risque élevé.',
      ],
      profile: {
        environment: 'Village portuaire, rues pentues, vignobles, falaises et portes du Parc national des Calanques.',
        terrain: 'Relief marqué et circulation dense en approche, puis boucle urbaine compacte avec secteurs piétons.',
        travelStyle: 'Journée combinée : rejoindre Cassis autrement, rouler peu sur place, marcher au port et conserver un retour confirmé.',
        bestFor: 'Une escapade mer et patrimoine avec logistique précise, marge de temps et capacité à renoncer aux extensions naturelles.',
      },
      routeSections: [
        {
          title: 'Arriver sans épuiser la batterie',
          text: 'La gare SNCF et le parking relais des Gorguettes sont les deux repères les plus utiles. Vérifie ensuite la navette ou la liaison vers le centre au lieu de supposer une arrivée directe au port.',
        },
        {
          title: 'Village et port',
          text: 'Construis une petite boucle autour du centre, du port et des plages urbaines accessibles. Les rues peuvent être pentues et très fréquentées : marche dès que l’espace devient piéton ou encombré.',
        },
        {
          title: 'Calanques et route des Crêtes',
          text: 'Considère ces secteurs comme des extensions distinctes, soumises à réglementation, météo et capacités physiques. Ne les ajoute pas au trajet en trottinette sans confirmation locale explicite.',
        },
      ],
      access: [
        'La gare SNCF de Cassis est située quartier de la Gare ; consulte les départs et travaux TER avant le voyage.',
        'Le parking relais gratuit des Gorguettes, à l’entrée de Cassis sur la D559, dessert le centre et certains accès par navette selon la période.',
        'L’entrée de Port-Miou se situe à environ trente minutes à pied du centre selon le Parc national : ne la traite pas comme une simple continuation urbaine.',
      ],
      watchOutFor: [
        'Circulation et stationnement difficiles, particulièrement en saison et le week-end.',
        'Accès aux Calanques potentiellement interdit du 1er juin au 30 septembre selon le risque incendie.',
        'Route des Crêtes sinueuse, exposée au vent et susceptible d’être fermée.',
        'Recharge et transport de la trottinette dans le TER ou les navettes à vérifier avant départ.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès du Parc national des Calanques, de l’office de tourisme de Cassis et de SNCF TER. Les accès en temps réel, navettes et règles de transport peuvent évoluer.',
      sources: [
        {
          label: 'Parc national des Calanques — Venir au départ de Cassis',
          url: 'https://www.calanques-parcnational.fr/fr/venir-aux-calanques-de-cassis',
        },
        {
          label: 'Office de tourisme de Cassis — Stationnement',
          url: 'https://www.ot-cassis.com/infos-pratiques/stationnement-parking/',
        },
        {
          label: 'SNCF TER — Gare de Cassis',
          url: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/gares/cassis-87751776',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Arrivée recommandée par train, voiture ou trajet combiné, puis courte boucle locale entre centre et port. Les Calanques et la route des Crêtes sont des extensions distinctes à vérifier.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Boucle locale partagée, espaces naturels réglementés',
          notes:
            'Aucune continuité adaptée depuis Aix n’est établie ; les autorisations concernant les cycles dans le Parc national ne doivent pas être transposées aux trottinettes.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Relief, trafic saisonnier, routes étroites et accès réglementés rendent indispensable un départ local et un itinéraire court.',
        },
        parkingAdvice:
          'Privilégie les Gorguettes ou un stationnement officiel, puis garde la trottinette avec toi ; ne compte pas sur une place au centre ou à la Presqu’île.',
        bestTime: 'Hors pointe estivale, tôt dans la journée et après contrôle des accès au massif',
      },
    },
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
      'Une escapade Côte Bleue à organiser depuis la gare ou un départ local, entre port et littoral, avec les sentiers réservés à la marche.',
    tips: [
      'Rejoins Carry en train ou en voiture puis limite la partie roulée au tissu urbain autorisé.',
      'Parcours le sentier du Lézard à pied : sa présentation officielle est pédestre.',
      'Contrôle les horaires TER et les règles de transport de la trottinette avant de partir.',
      'En été, vérifie l’accès aux massifs et anticipe la fréquentation des plages.',
    ],
    latitude: 43.3311,
    longitude: 5.1531,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Carry-le-Rouet offre un changement d’air net, mais ses 66 kilomètres indicatifs depuis Aix excluent l’idée d’un aller-retour simple avec une batterie courante. Le scénario solide est une arrivée en TER, en voiture ou un trajet combiné, puis une petite boucle locale autour du port.',
        'La gare se trouve avenue Pierre-Sémard et le port à quelques centaines de mètres selon les informations touristiques locales. Le sentier du Lézard part du quai Maleville vers la Tuilière : il est décrit comme un sentier littoral pédestre, pas comme une voie de circulation pour trottinettes.',
        'La sortie peut associer port, plage Fernandel et halte face à la mer sans multiplier les kilomètres. Les calanques et collines sont réglementées en période de risque incendie ; elles doivent rester des prolongements pédestres vérifiés, jamais une boucle électrique supposée autorisée.',
      ],
      profile: {
        environment: 'Station littorale de la Côte Bleue, port de plaisance, petites plages, calanques et reliefs secs en arrière-plan.',
        terrain: 'Départ local urbain avec quelques pentes, puis promenade littorale à parcourir à pied.',
        travelStyle: 'Échappée combinée : arrivée en gare ou voiture, boucle compacte port-plage et retour déjà confirmé.',
        bestFor: 'Une demi-journée au bord de la mer, un coucher de soleil préparé ou une sortie sans long parcours routier sur place.',
      },
      routeSections: [
        {
          title: 'De la gare au port',
          text: 'L’avenue Pierre-Sémard donne un repère simple depuis la gare. Reste sur les voies urbaines autorisées et garde une marge pour la remontée au retour.',
        },
        {
          title: 'Port et plage Fernandel',
          text: 'Le quai et la petite plage forment une boucle locale courte. À l’ouest, le sentier du Lézard commence près du quai Maleville : passe à pied pour respecter sa vocation pédestre.',
        },
        {
          title: 'Retour ferroviaire ou motorisé',
          text: 'Vérifie le départ réel du TER, les travaux et les conditions applicables à l’engin. Garde assez de batterie pour rejoindre la gare sans dépendre d’une recharge locale.',
        },
      ],
      access: [
        'Gare TER : 27 avenue Pierre-Sémard, 13620 Carry-le-Rouet ; le guichet n’est plus en service mais un distributeur est annoncé.',
        'Le port et plusieurs services se situent à proximité de la gare, ce qui permet une boucle locale sans chercher un itinéraire intégral depuis Aix.',
        'Pour les plages et calanques, consulte les accès et restrictions saisonnières publiés par l’office de tourisme.',
      ],
      watchOutFor: [
        'Très longue distance depuis Aix et aucun retour ferroviaire à supposer sans horaire confirmé.',
        'Sentiers littoraux et accès aux calanques présentés comme pédestres, non comme voies pour trottinettes.',
        'Restrictions estivales liées au risque incendie dans les collines et calanques.',
        'Fréquentation des plages, pentes locales et recharge non confirmée.',
      ],
      verificationNote:
        'Informations vérifiées à distance auprès de SNCF TER et de l’office de tourisme de Carry-le-Rouet. Horaires, accès aux massifs, stationnement et transport de la trottinette doivent être recontrôlés.',
      sources: [
        {
          label: 'SNCF TER — Gare de Carry-le-Rouet',
          url: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/se-deplacer/gares/carry-le-rouet-87753566',
        },
        {
          label: 'Office de tourisme de Carry-le-Rouet — Sentier du Lézard',
          url: 'https://www.otcarrylerouet.fr/le-sentier-du-lezard.html',
        },
        {
          label: 'Office de tourisme de Carry-le-Rouet — Accès et transports',
          url: 'https://www.otcarrylerouet.fr/acces-transports.html',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Arrivée par TER, voiture ou trajet combiné, boucle urbaine courte entre gare et port, puis découverte du sentier littoral à pied.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Voirie locale, sentier littoral pédestre',
          notes:
            'Aucune liaison continue adaptée depuis Aix n’est confirmée et le sentier du Lézard est documenté comme itinéraire pédestre.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'La stratégie sûre repose sur un départ local ; sur place, pentes, affluence et cohabitation avec les piétons demandent une allure basse.',
        },
        parkingAdvice:
          'Si tu viens en voiture, utilise un parking officiel ; si tu viens en train, garde la trottinette avec toi et ne l’abandonne pas pendant la marche littorale.',
        bestTime: 'Hors forte affluence, avec retour TER confirmé et accès aux massifs vérifié',
      },
    },
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
      'Une sortie patrimoniale sur la D17 vers Le Tholonet, à distinguer d’une liaison vers Palette et à préparer comme route sinueuse partagée.',
    tips: [
      'Choisis avant le départ entre un objectif Le Tholonet par la D17 et un détour vers Palette.',
      'Ne suppose aucune bande cyclable continue sur la route Cézanne.',
      'Évite les heures de trafic et garde une marge pour le relief du retour.',
      'Vérifie l’accès aux massifs avant toute prolongation au-delà de la route.',
    ],
    latitude: 43.529,
    longitude: 5.5142,
    rechargeStatus: 'nearby',
    editorial: {
      introduction: [
        'La route Cézanne est la D17 qui relie Aix au Tholonet sur 4,690 kilomètres. Classée au titre des monuments historiques, elle traverse pins, vignes et oliviers avec Sainte-Victoire en ligne de mire. Son intérêt paysager ne doit toutefois pas masquer son statut de route départementale partagée et sinueuse.',
        'Le nom de cette fiche associe Palette et la route Cézanne, deux repères proches mais pas un tracé unique garanti. Pour rester lisible, prépare soit un aller-retour vers Le Tholonet par la D17, soit un itinéraire distinct vers Palette après vérification cartographique, sans improviser une boucle entre les deux.',
        'Cette sortie courte demande surtout un bon horaire, de la visibilité et une allure maîtrisée. Toute extension vers les espaces naturels de Sainte-Victoire relève d’une autre sortie, soumise aux règles d’accès aux massifs et aux autorisations locales.',
      ],
      profile: {
        environment: 'Route patrimoniale bordée de pinèdes, vignes et oliveraies, avec vues progressives sur Sainte-Victoire.',
        terrain: 'Chaussée routière sinueuse et vallonnée, partagée avec les véhicules ; aucune continuité dédiée confirmée.',
        travelStyle: 'Aller-retour paysager court vers Le Tholonet, avec arrêt dans un espace sûr et demi-tour avant toute extension non préparée.',
        bestFor: 'Une sortie matinale ou de lumière douce, pour un utilisateur à l’aise sur route partagée et attentif au trafic.',
      },
      routeSections: [
        {
          title: 'Sortie d’Aix',
          text: 'Rejoins la D17 en contrôlant les premiers carrefours. La route devient rapidement plus paysagère, mais elle reste ouverte à la circulation et ne doit pas être abordée comme une voie verte.',
        },
        {
          title: 'Route Cézanne vers Le Tholonet',
          text: 'La section patrimoniale mesure 4,690 kilomètres selon la Ville. Maintiens une trajectoire prévisible, ne t’arrête qu’en retrait de la chaussée et accepte de faire demi-tour si le trafic est inconfortable.',
        },
        {
          title: 'Palette ou prolongement',
          text: 'Palette n’est pas automatiquement sur le même axe. Toute liaison supplémentaire doit être calculée séparément ; les chemins de massif ne constituent pas une continuation autorisée de la route.',
        },
      ],
      access: [
        'Repère principal : D17, dite route Cézanne ou petite route du Tholonet, depuis Aix vers Le Tholonet.',
        'Pour Palette, utilise une destination cartographique précise et compare le tracé proposé aux voies réellement autorisées.',
        'En période estivale, vérifie les conditions d’accès avant toute halte ou extension dans un secteur de massif.',
      ],
      watchOutFor: [
        'Route sinueuse à double sens, circulation automobile et absence de bande cyclable continue confirmée.',
        'Arrêts dangereux en bord de chaussée pour photographier le paysage.',
        'Relief et vent pouvant augmenter la consommation au retour.',
        'Confusion possible entre la destination Palette, Le Tholonet et les accès aux massifs.',
      ],
      verificationNote:
        'Le tracé patrimonial et sa longueur ont été vérifiés auprès de la Ville d’Aix-en-Provence. L’état de la chaussée, le trafic et les accès naturels doivent être contrôlés au moment du départ.',
      sources: [
        {
          label: 'Ville d’Aix-en-Provence — La route Cézanne',
          url: 'https://www.aixenprovence.fr/IMG/pdf/alm_67webv2.pdf',
        },
        {
          label: 'Préfecture des Bouches-du-Rhône — Accès aux massifs',
          url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Aller-retour indicatif sur la D17 vers Le Tholonet. Toute liaison vers Palette ou prolongation en massif doit être calculée et vérifiée séparément.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Route départementale partagée',
          notes:
            'Le classement patrimonial de la route ne constitue pas un aménagement cyclable ; aucune continuité dédiée n’est confirmée par les sources consultées.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'Virages, circulation à double sens, relief et arrêts paysagers imposent un horaire calme, de la visibilité et une grande prudence.',
        },
        parkingAdvice:
          'Ne t’arrête pas sur l’accotement étroit ; choisis uniquement un espace autorisé et visible, sans bloquer un accès riverain ou naturel.',
        bestTime: 'Tôt le matin, par temps sec et avec un trafic modéré',
      },
    },
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
      'Un domaine naturel protégé à rejoindre comme destination locale ou combinée, puis à visiter à pied depuis le parking aménagé de Gémenos.',
    tips: [
      'Ne présente pas le parc comme un itinéraire trottinette : le VTT y est interdit.',
      'Appelle le répondeur de la garde départementale avant de te déplacer si le vent ou le risque incendie est marqué.',
      'Utilise le parking officiel comme point de bascule entre transport et visite pédestre.',
      'Respecte l’interdiction de baignade et les restrictions concernant les chiens.',
    ],
    latitude: 43.4426,
    longitude: 5.6031,
    rechargeStatus: 'verify',
    editorial: {
      introduction: [
        'Le domaine départemental de Saint-Pons protège une vallée boisée de 1 796 hectares près de Gémenos, avec ruisseau, moulins et abbaye. Sa valeur vient d’une visite pédestre dans un environnement fragile, pas d’une boucle à parcourir en trottinette.',
        'Le Département interdit le VTT dans le parc. Cette règle suffit à écarter toute promesse de circulation en trottinette électrique : il faut rejoindre le parking aménagé par un moyen adapté, sécuriser l’engin, puis continuer à pied sur le sentier balisé.',
        'Le domaine peut fermer en cas de vent violent ou de risque incendie. La distance affichée depuis Aix reste indicative et ne décrit ni la longueur routière réelle ni le relief ; un départ local en voiture ou une organisation combinée est généralement plus cohérent.',
      ],
      profile: {
        environment: 'Vallée départementale protégée, ruisseau du Fauge, patrimoine hydraulique, abbaye et forêt de la Sainte-Baume.',
        terrain: 'Accès routier jusqu’au parking, puis sentier pédestre en fond de vallée ; VTT interdit dans le parc.',
        travelStyle: 'Destination nature combinée : arriver au parking, laisser la trottinette en sécurité et consacrer le temps disponible à la marche.',
        bestFor: 'Une demi-journée calme et patrimoniale avec départ local, sans dépendre d’une recharge sur place.',
      },
      routeSections: [
        {
          title: 'Arrivée par Gémenos',
          text: 'Le Département indique un accès par la RD2 ou par l’A50 puis Gémenos. Depuis Aix, calcule l’itinéraire routier réel et privilégie un transport adapté plutôt qu’une estimation à vol d’oiseau.',
        },
        {
          title: 'Parking et prairie d’accueil',
          text: 'Le grand parking gratuit, la Maison du Parc et les aires de pique-nique se situent à l’entrée. C’est ici que la partie roulée doit s’arrêter.',
        },
        {
          title: 'Vallée, moulins et abbaye',
          text: 'Le sentier fléché passe par plusieurs anciens moulins avant l’abbaye. Parcours-le à pied et ne prolonge vers les sentiers de la Sainte-Baume qu’avec l’équipement et le temps nécessaires.',
        },
      ],
      access: [
        'Accès officiel : RD2 en venant de Plan-d’Aups, ou A50 sortie Aubagne puis Gémenos et parc de Saint-Pons.',
        'Grand parking gratuit aménagé à environ un kilomètre du centre de Gémenos, avec Maison du Parc et aires de pique-nique.',
        'Le répondeur de la garde départementale au 04 13 31 50 30 permet de vérifier les conditions d’ouverture annoncées.',
      ],
      watchOutFor: [
        'VTT interdit dans le parc départemental : ne présume pas d’une autorisation pour la trottinette.',
        'Fermeture possible en cas de vent supérieur à 50 km/h ou de journée rouge pour le risque incendie.',
        'Baignade interdite dans le cours d’eau.',
        'Chiens interdits au-delà de la prairie ou du pont des Tompines selon les informations départementales.',
      ],
      verificationNote:
        'Accès, équipements et restrictions vérifiés à distance auprès du Département des Bouches-du-Rhône. L’ouverture, la signalisation et les limites exactes doivent être confirmées le jour de la visite.',
      sources: [
        {
          label: 'Département des Bouches-du-Rhône — Saint-Pons',
          url: 'https://www.departement13.fr/vivre-en-provence/espaces-naturels/parcs-et-domaines/les-parcs/saint-pons?L=0',
        },
        {
          label: 'Département des Bouches-du-Rhône — Balade au domaine de Saint-Pons',
          url: 'https://www.departement13.fr/vivre-en-provence/redecouvrir-la-provence/idees-de-balades/en-vadrouille/domaine-departemental-de',
        },
      ],
      detailOverrides: {
        routeNotes:
          'Trajet jusqu’au parking officiel de Saint-Pons, de préférence en départ local ou combiné, puis visite exclusivement pédestre du domaine.',
        cyclingInfrastructure: {
          status: 'limited',
          label: 'Accès routier, parc interdit au VTT',
          notes:
            'Le règlement départemental interdit le VTT dans le parc ; aucune circulation en trottinette ne doit y être présentée comme autorisée.',
        },
        roadSafety: {
          level: 'caution',
          notes:
            'La distance routière depuis Aix, les axes d’accès et l’absence de recharge confirmée rendent un départ local nettement plus prudent.',
        },
        parkingAdvice:
          'Utilise le grand parking aménagé et prévois une solution d’attache autorisée ; ne laisse pas l’engin sans surveillance pendant une longue randonnée.',
        bestTime: 'Le matin, après vérification du vent, du risque incendie et de l’ouverture du parc',
      },
    },
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
