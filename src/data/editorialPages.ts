export type EditorialGuideSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

export type EditorialGuideSource = {
  label: string;
  url: string;
  note?: string;
};

export type EditorialGuideFaq = {
  question: string;
  answer: string;
};

export type EditorialGuideCta = {
  label: string;
  to: string;
  description: string;
};

export type EditorialGuide = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  sections: EditorialGuideSection[];
  faq: EditorialGuideFaq[];
  relatedSpotIds: string[];
  relatedGuideSlugs: string[];
  ctas: EditorialGuideCta[];
  sources?: EditorialGuideSource[];
};

export const editorialGuides: EditorialGuide[] = [
  {
    slug: 'sortie-trottinette-cassis',
    title: 'Sortie trottinette Cassis : ce qu il faut verifier avant de partir',
    shortTitle: 'Sortie trottinette Cassis',
    description:
      "Preparez une sortie trottinette vers Cassis depuis Aix : distance indicative, marge batterie, recharge possible et retour alternatif a verifier.",
    intro:
      "Cassis attire pour le littoral et le port, mais ce n est pas une sortie a traiter comme un simple aller-retour. L enjeu est surtout de cadrer l autonomie, le retour et la recharge utile avant le depart.",
    sections: [
      {
        title: 'Pourquoi cette sortie demande plus de preparation',
        paragraphs: [
          "Depuis Aix, Cassis entre dans les sorties longues. La distance reelle depend du point de depart, du denivele, du vent et du passage retenu.",
          "La bonne logique consiste a verifier l autonomie utile, garder une vraie marge et prevoir un plan B si la recharge sur place n est pas confirmee.",
        ],
      },
      {
        title: 'Le bon enchainement avant depart',
        paragraphs: [
          "Ouvre d abord le planner pour comparer ton autonomie avec un aller-retour indicatif, puis controle la carte et la fiche Cassis pour les points concrets.",
          "Si ta trottinette est en zone limite, considere directement le train, la voiture ou un retour partiel autrement que comme un echec de planification.",
        ],
      },
    ],
    faq: [
      {
        question: 'Cassis est-elle une sortie simple depuis Aix ?',
        answer: "Non. C est une sortie longue a preparer avec marge, recharge verifiee ou retour alternatif.",
      },
      {
        question: 'Faut-il compter sur une borne voiture a Cassis ?',
        answer: "Non. Il faut verifier la presence d une prise 220V ou Schuko avant de compter dessus pour une trottinette.",
      },
    ],
    relatedSpotIds: ['cassis', 'la-ciotat', 'marseille-vieux-port-littoral'],
    relatedGuideSlugs: ['sortie-trottinette-la-ciotat', 'recharge-trottinette-aix'],
    ctas: [
      { label: 'Ouvrir le planner', to: '/planner', description: "Comparer l autonomie avant de partir vers Cassis." },
      { label: 'Voir la fiche Cassis', to: '/sorties/cassis', description: 'Relire les infos utiles et le statut recharge.' },
      { label: 'Voir la recharge', to: '/recharge', description: 'Verifier les options 220V et les limites des bornes voiture.' },
    ],
  },
  {
    slug: 'recharge-trottinette-aix',
    title: 'Recharge trottinette Aix : comment verifier une vraie solution utile',
    shortTitle: 'Recharge trottinette Aix',
    description:
      "Reperez une recharge trottinette autour d Aix sans confondre borne voiture et prise 220V, avec les bons reflexes avant depart.",
    intro:
      "Le sujet n est pas de trouver une borne electrique au sens large, mais une solution reellement utilisable avec le chargeur de la trottinette. Le filtre principal reste la presence d une prise 220V ou d une compatibilite confirmee.",
    sections: [
      {
        title: 'Ce qu il faut regarder en priorite',
        paragraphs: [
          "Une borne voiture n est pas automatiquement exploitable pour une trottinette. Le point cle est la prise disponible et l acces reel au branchement.",
          "Les applications servent a reperer un lieu, pas a garantir la compatibilite finale. Il faut donc verifier avant depart et si possible appeler.",
        ],
      },
      {
        title: 'Quand la recharge devient vraiment utile',
        paragraphs: [
          "La recharge sert surtout a securiser une sortie longue, un retour partiel ou une pause longue. Pour une sortie courte, mieux vaut partir batterie pleine que construire un plan fragile autour d une borne.",
          "Sur les longues sorties, combine toujours recharge, marge batterie et solution de retour alternative.",
        ],
      },
    ],
    faq: [
      {
        question: 'Chargemap suffit-il pour savoir si je peux charger une trottinette ?',
        answer: 'Non. Il faut confirmer le type de prise et les conditions d acces.',
      },
      {
        question: 'Une recharge a verifier peut-elle quand meme servir ?',
        answer: 'Oui, mais seulement comme piste a confirmer avant depart, jamais comme garantie.',
      },
    ],
    relatedSpotIds: ['parc-jourdan', 'place-d-albertas-vieil-aix', 'parc-de-la-duranne'],
    relatedGuideSlugs: ['sortie-trottinette-cassis', 'balade-trottinette-sainte-victoire'],
    ctas: [
      { label: 'Voir la page recharge', to: '/recharge', description: 'Comparer les statuts 220V, voiture, prive et a verifier.' },
      { label: 'Voir la carte', to: '/carte', description: 'Croiser les sorties et les points de recharge autour d Aix.' },
      { label: 'Relire les conseils', to: '/conseils', description: 'Garder les bons reflexes avant une sortie longue.' },
    ],
  },
  {
    slug: 'balade-trottinette-sainte-victoire',
    title: 'Balade trottinette Sainte-Victoire : zones faciles, marges et prudence',
    shortTitle: 'Balade trottinette Sainte-Victoire',
    description:
      "Choisissez une balade trottinette autour de Sainte-Victoire avec plus de clarte sur la marge batterie, les secteurs a viser et la preparation utile.",
    intro:
      "Sainte-Victoire fait partie des envies les plus fortes autour d Aix, mais toutes les approches ne se valent pas pour une trottinette. Le bon niveau de preparation depend du secteur choisi et de la marge batterie disponible.",
    sections: [
      {
        title: 'Les secteurs a regarder en premier',
        paragraphs: [
          "Le Tholonet, Bimont, Roques-Hautes ou les Sources de l Infernet ne demandent pas le meme effort. Il faut raisonner en troncons simples et non en grand parcours idealise.",
          "Plus le relief monte, plus la marge batterie devient prioritaire. Un itineraire court et bien lu vaut mieux qu une boucle trop ambitieuse.",
        ],
      },
      {
        title: 'Le bon usage du site pour cette zone',
        paragraphs: [
          "Utilise le planner pour cadrer l autonomie, puis la carte pour visualiser les approches. Ensuite relis une ou deux fiches seulement, celles qui correspondent vraiment au niveau de prudence souhaite.",
          "En ete, pense aussi aux fermetures de massifs et au vent. Ce sont des contraintes de sortie, pas des details de confort.",
        ],
      },
    ],
    faq: [
      {
        question: 'Sainte-Victoire convient-elle a une sortie du soir ?',
        answer: 'Oui sur certains secteurs proches, mais pas sur une logique de grande boucle.',
      },
      {
        question: 'Quelle erreur faut-il eviter ici ?',
        answer: 'Sous-estimer le relief et partir sans marge batterie suffisante.',
      },
    ],
    relatedSpotIds: ['sainte-victoire-le-tholonet', 'barrage-de-bimont', 'roques-hautes', 'sources-de-l-infernet'],
    relatedGuideSlugs: ['itineraire-trottinette-le-tholonet', 'sortie-trottinette-aix-centre'],
    ctas: [
      { label: 'Voir le planner', to: '/planner', description: 'Tester ton autonomie avant une sortie nature.' },
      { label: 'Voir la carte', to: '/carte', description: 'Comparer les zones proches autour de Sainte-Victoire.' },
      { label: 'Voir les conseils', to: '/conseils', description: 'Relire les points de vigilance sur relief et chaleur.' },
    ],
  },
  {
    slug: 'sortie-trottinette-aix-centre',
    title: 'Sortie trottinette Aix centre : idees simples pour une vraie sortie locale',
    shortTitle: 'Sortie trottinette Aix centre',
    description:
      "Trouvez une sortie trottinette simple dans Aix centre avec des idees courtes, faciles a lancer apres le travail ou pour une balade calme.",
    intro:
      "Le centre d Aix et ses abords sont souvent les meilleurs points d entree pour lancer le site. Les distances restent courtes, le planner devient secondaire et l enjeu principal est de choisir une ambiance plutot qu une autonomie extreme.",
    sections: [
      {
        title: 'Quand viser le centre plutot qu une sortie longue',
        paragraphs: [
          "Si tu veux rouler sans logistique lourde, Aix centre reste la base la plus fiable. Tu peux sortir le soir, tester ton materiel ou simplement retrouver une boucle propre sans trop tirer sur la batterie.",
          "Le centre sert aussi de point de depart pour progresser dans la preparation avant de viser des secteurs plus engages.",
        ],
      },
      {
        title: 'Les bons reperes a croiser',
        paragraphs: [
          "Le plus utile est de combiner une fiche courte, la carte et si besoin une verif rapide sur la recharge. Sur ce format, le gain vient surtout de la simplicite du plan.",
          "C est aussi la meilleure zone pour installer le site en PWA et le garder a portee de main pour des sorties rapides.",
        ],
      },
    ],
    faq: [
      {
        question: 'Le planner est-il utile pour une sortie en centre-ville ?',
        answer: 'Oui pour garder une lecture simple de la marge, mais il devient moins critique que sur une sortie longue.',
      },
      {
        question: 'Quel est le meilleur usage du catalogue ici ?',
        answer: 'Filtrer par ambiance, moment et niveau de simplicite.',
      },
    ],
    relatedSpotIds: ['place-d-albertas-vieil-aix', 'pavillon-de-vendome', 'parc-jourdan', 'promenade-de-la-torse'],
    relatedGuideSlugs: ['balade-trottinette-sainte-victoire', 'recharge-trottinette-aix'],
    ctas: [
      { label: 'Voir les sorties', to: '/sorties?distance=0%E2%80%933%20km', description: 'Lancer une recherche sur les formats les plus courts.' },
      { label: 'Voir la carte', to: '/carte', description: 'Comparer rapidement les points proches autour de toi.' },
      { label: 'Voir le planner', to: '/planner', description: 'Garder un repere simple sur ton autonomie disponible.' },
    ],
  },
  {
    slug: 'sortie-trottinette-cote-bleue',
    title: 'Cote Bleue en trottinette : choisir sa zone et organiser le retour',
    shortTitle: 'Guide trottinette Cote Bleue',
    description:
      "Comparez Niolon, La Redonne, Carry-le-Rouet et Sausset-les-Pins pour preparer une sortie trottinette sur la Cote Bleue avec un retour realiste.",
    intro:
      "La Cote Bleue n est pas une destination unique. Entre calanques encaisses, villages-gares et fronts de mer plus urbains, le bon choix depend surtout du relief accepte, du mode d approche et du plan de retour.",
    sections: [
      {
        title: 'Choisir une ambiance avant de choisir une distance',
        paragraphs: [
          "Niolon et Ensuès-la-Redonne conviennent a une sortie tournee vers les calanques, avec des acces parfois raides et peu d espace pour improviser. Carry-le-Rouet et Sausset-les-Pins offrent un cadre plus urbain, plus simple pour fractionner la balade et faire demi-tour.",
          "Ce guide aide a choisir une base. Les fiches associees servent ensuite a verifier chaque destination, pas a supposer qu une liaison continue existe entre tous les secteurs.",
        ],
        items: [
          'Niolon ou La Redonne : panorama et relief, avec une approche locale a privilegier.',
          'Carry-le-Rouet : port et services, pour une sortie plus compacte.',
          'Sausset-les-Pins : front de mer plus ouvert, mais vent a integrer au retour.',
        ],
      },
      {
        title: 'Distinguer sentier littoral et voie roulable',
        paragraphs: [
          "Le sentier du littoral et le GR51 sont presentes comme des parcours de randonnee pedestre par l office de tourisme. Leur presence sur une carte ne signifie donc pas qu ils soient adaptes ou autorises a la trottinette.",
          "Pour rouler, reste sur des voies dont l acces et le revetement ont ete verifies. Les petites routes d approche peuvent aussi etre frequentees : un secteur agreable a pied n est pas automatiquement confortable en engin motorise.",
        ],
      },
      {
        title: 'Le train peut rapprocher le depart, pas garantir le trajet',
        paragraphs: [
          "Plusieurs communes de la Cote Bleue disposent d une gare. Cela permet d envisager une sortie locale plutot qu un aller-retour integral depuis Aix, a condition de verifier les horaires, les correspondances et les conditions de transport de la trottinette pour le jour choisi.",
          "Les regles TER indiquent que les trottinettes pliees peuvent etre admises sous conditions d encombrement. Ce point reste a confirmer avant chaque voyage : il ne doit pas etre traite comme une garantie de retour.",
        ],
      },
      {
        title: 'Construire un retour resistant au vent',
        paragraphs: [
          "Sur le littoral, un vent defavorable peut augmenter la consommation et rendre le dernier troncon plus exigeant. Garde la partie la plus simple pour la fin et fixe un seuil de demi-tour avant de partir.",
        ],
        items: [
          'Verifier vent, temperature et acces aux massifs le matin meme.',
          'Conserver une marge batterie pour les remontees vers la gare ou le stationnement.',
          'Prevoir une heure limite de retour independante de la batterie affichee.',
          'Ne pas faire reposer le retour sur une prise non confirmee.',
        ],
      },
      {
        title: 'Strategie conseillee',
        paragraphs: [
          "Choisis une seule zone, rapproche le point de depart si necessaire, puis compare l autonomie dans le planner. La carte sert ensuite a reperer les fiches et a cadrer le secteur, sans remplacer une verification de la voie sur place.",
        ],
      },
    ],
    faq: [
      {
        question: 'Peut-on relier toutes les destinations de la Cote Bleue en trottinette ?',
        answer: 'Il ne faut pas le supposer. Les fiches de zone, le relief et les voies roulables doivent etre controles avant de construire une liaison.',
      },
      {
        question: 'Quelle zone choisir pour un premier essai ?',
        answer: 'Carry-le-Rouet ou Sausset-les-Pins offrent un cadre plus urbain pour une boucle locale. Niolon et La Redonne demandent davantage d attention au relief et aux acces.',
      },
    ],
    relatedSpotIds: ['carry-le-rouet', 'sausset-les-pins', 'ensues-la-redonne', 'niolon'],
    relatedGuideSlugs: ['sortie-trottinette-cassis', 'sortie-trottinette-la-ciotat'],
    ctas: [
      { label: 'Comparer les quatre fiches', to: '/sorties?mood=mer', description: 'Choisir une base littorale avant de tracer une sortie.' },
      { label: 'Evaluer la marge batterie', to: '/planner', description: 'Tester un depart local et un scenario de retour.' },
      { label: 'Ouvrir la carte', to: '/carte', description: 'Situer les gares, les destinations et ton point de depart.' },
      { label: 'Verifier la recharge', to: '/recharge', description: 'Garder la recharge comme solution confirmee, jamais supposee.' },
    ],
    sources: [
      {
        label: 'Office de tourisme de Marseille - La Cote Bleue',
        url: 'https://www.marseille-tourisme.com/decouvrez-marseille/autour-de-marseille/la-cote-bleue/',
        note: 'Communes desservies, gares et distinction avec le sentier littoral pedestre.',
      },
      {
        label: 'TER Sud - Voyager avec un velo ou une trottinette',
        url: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/services-contacts/voyager-avec-velo/a-bord',
        note: 'Conditions de transport a verifier avant le voyage.',
      },
      {
        label: 'Prefecture des Bouches-du-Rhone - Acces aux massifs',
        url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        note: 'Conditions saisonnieres a consulter le jour du depart.',
      },
    ],
  },
  {
    slug: 'sortie-trottinette-marseille',
    title: 'Sortie trottinette Marseille : quand la traiter comme une vraie sortie preparee',
    shortTitle: 'Sortie trottinette Marseille',
    description:
      "Organisez une sortie trottinette vers Marseille avec une lecture plus fiable de la distance, du retour et des compromis utiles.",
    intro:
      "Marseille peut donner envie de partir directement en trottinette depuis Aix, mais ce n est pas une sortie a improviser. L objectif ici est de savoir quand elle devient raisonnable et quand il faut changer d approche.",
    sections: [
      {
        title: 'Le bon raisonnement pour Marseille',
        paragraphs: [
          "La question n est pas seulement de rejoindre Marseille, mais de garder encore assez de marge pour circuler sur place et revenir.",
          "Si tu veux surtout profiter du Vieux-Port ou du littoral, un depart rapproche ou un retour alternatif est souvent plus intelligent qu un aller-retour integral.",
        ],
      },
      {
        title: 'Comment exploiter le site pour cette destination',
        paragraphs: [
          "Commence par le planner, puis ouvre la fiche la plus proche de ton envie reelle. Le reste doit servir a valider, pas a multiplier les hypothetises.",
          "La page recharge peut aider a reperer des pistes, mais elle ne remplace pas une verification concrete de la prise.",
        ],
      },
    ],
    faq: [
      {
        question: 'Marseille est-elle faisable avec une trottinette 30 km ?',
        answer: 'Pas comme sortie simple depuis Aix. Il faut une autre logistique ou une recharge solide verifiee.',
      },
      {
        question: 'Que faut-il privilegier ?',
        answer: 'Un bon plan de retour plutot qu une promesse d autonomie trop optimiste.',
      },
    ],
    relatedSpotIds: ['marseille-vieux-port-littoral', 'niolon', 'la-ciotat'],
    relatedGuideSlugs: ['sortie-trottinette-cote-bleue', 'recharge-trottinette-aix'],
    ctas: [
      { label: 'Voir la fiche Marseille', to: '/sorties/marseille-vieux-port-littoral', description: 'Relire les points utiles pour la destination.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Mesurer la marge disponible avec ton autonomie.' },
      { label: 'Voir les conseils', to: '/conseils', description: 'Garder les reflexes utiles avant une longue sortie.' },
    ],
  },
  {
    slug: 'balade-trottinette-peyrolles',
    title: 'Balade trottinette Peyrolles : eau, sortie facile et marge batterie',
    shortTitle: 'Balade trottinette Peyrolles',
    description:
      "Comparez les sorties trottinette autour de Peyrolles pour viser un format calme, lisible et plus simple a preparer depuis Aix.",
    intro:
      "Peyrolles et ses abords offrent un bon compromis entre decor, respiration et lecture simple de la distance. C est souvent une zone utile pour monter d un cran apres les balades tres courtes d Aix centre.",
    sections: [
      {
        title: 'Pourquoi cette zone marche bien',
        paragraphs: [
          "Le cadre est depaysant sans basculer directement dans une sortie aussi lourde que le littoral ou le Luberon. Cela permet de garder une preparation utile mais encore lisible.",
          "Si tu veux tester une sortie week-end sans surcharger la batterie, Peyrolles est souvent un bon palier.",
        ],
      },
      {
        title: 'Ce qu il faut encore verifier',
        paragraphs: [
          "Comme toujours, le trajet reel depend du point de depart et des choix de route. Il faut donc garder la distance pour ce qu elle est : un repere indicatif.",
          "Si tu vises une vraie journee, reviens aussi sur la recharge et les conseils, meme si la zone semble plus simple au premier regard.",
        ],
      },
    ],
    faq: [
      {
        question: 'Peyrolles est-elle plus simple que Cassis ou Marseille ?',
        answer: 'Oui dans beaucoup de cas, mais cela reste a verifier selon ton depart et ton autonomie utile.',
      },
      {
        question: 'Quel usage du site est le plus pertinent ici ?',
        answer: 'Catalogue plus planner, avec un passage carte si tu hesites entre plusieurs points.',
      },
    ],
    relatedSpotIds: ['lac-de-peyrolles', 'plan-deau-plantain-peyrolles', 'le-puy-sainte-reparade', 'pertuis'],
    relatedGuideSlugs: ['balade-trottinette-sainte-victoire', 'sortie-trottinette-luberon'],
    ctas: [
      { label: 'Voir les sorties', to: '/sorties?moment=weekend', description: 'Comparer les formats week-end les plus simples.' },
      { label: 'Voir la fiche Peyrolles', to: '/sorties/lac-de-peyrolles', description: 'Relire le point principal de la zone.' },
      { label: 'Voir la carte', to: '/carte', description: 'Visualiser les points proches autour de Peyrolles.' },
    ],
  },
  {
    slug: 'sortie-trottinette-luberon',
    title: 'Sortie trottinette Luberon : belle idee, mais format longue distance',
    shortTitle: 'Sortie trottinette Luberon',
    description:
      "Preparez une sortie trottinette dans le Luberon avec plus de lucidité sur la distance, la marge utile et les solutions de retour.",
    intro:
      "Le Luberon fait partie des envies fortes du site, mais ce n est pas une promesse de sortie simple depuis Aix. Il faut le traiter comme une destination a logistique claire, pas comme une simple boucle du week-end.",
    sections: [
      {
        title: 'Ce que le site aide vraiment a faire',
        paragraphs: [
          "Le catalogue te permet d identifier les points qui donnent le plus envie, mais le planner sert ensuite a remettre ces envies a la bonne echelle.",
          "Sur le Luberon, un retour alternatif ou un depart rapproche n est pas un compromis honteux : c est souvent la forme la plus pertinente.",
        ],
      },
      {
        title: 'Comment ne pas se tromper',
        paragraphs: [
          "Ne transforme pas une autonomie theorique en promesse de journee. Entre la distance reelle, le relief et les detours, la marge peut fondre vite.",
          "Si tu veux surtout rouler dans les villages, concentre l effort sur l organisation du transport plutot que sur un trajet integral depuis Aix.",
        ],
      },
    ],
    faq: [
      {
        question: 'Le Luberon est-il compatible avec une sortie simple ?',
        answer: 'Non. Il faut le classer en sortie longue ou en sortie avec autre mode de transport.',
      },
      {
        question: 'Quelle page consulter en plus ?',
        answer: 'La page recharge si tu comptes sur une pause batterie, et le planner dans tous les cas.',
      },
    ],
    relatedSpotIds: ['lourmarin', 'luberon-roussillon', 'luberon-gordes', 'luberon-bonnieux', 'voie-verte-du-calavon'],
    relatedGuideSlugs: ['balade-trottinette-peyrolles', 'recharge-trottinette-aix'],
    ctas: [
      { label: 'Ouvrir le planner', to: '/planner', description: 'Verifier si le projet reste compatible avec ta batterie.' },
      { label: 'Voir les conseils', to: '/conseils', description: 'Relire les erreurs a eviter sur les longues sorties.' },
      { label: 'Voir le catalogue', to: '/sorties', description: 'Comparer le Luberon avec des options plus simples.' },
    ],
  },
  {
    slug: 'sortie-trottinette-venelles-eguilles',
    title: 'Venelles ou Eguilles en trottinette : quelle sortie choisir depuis Aix ?',
    shortTitle: 'Venelles ou Eguilles',
    description:
      "Comparez Venelles et Eguilles pour choisir une sortie trottinette au nord ou a l ouest d'Aix selon le relief, l'ambiance et votre autonomie.",
    intro:
      "Venelles et Eguilles sont proches d Aix sur la carte, mais ne proposent pas la meme sortie. Venelles oriente vers un trajet plus fonctionnel au nord ; Eguilles vers un village perche et une approche plus sensible au relief a l ouest.",
    sections: [
      {
        title: 'Le choix rapide',
        paragraphs: [
          "Choisis Venelles si tu recherches une destination proche, une ambiance residentielle et un trajet que tu peux interrompre facilement. Choisis Eguilles si le village, le panorama et une sortie plus marquee par les pentes comptent davantage.",
        ],
        items: [
          'Venelles : direction nord, profil periurbain et points de demi-tour faciles a fixer.',
          'Eguilles : direction ouest, village en hauteur et reserve batterie a garder pour le relief.',
        ],
      },
      {
        title: 'Venelles : lire les amenagements sans supposer une continuite',
        paragraphs: [
          "La commune a engage un plan velo sur plusieurs annees et mentionne de nouveaux amenagements, dont une liaison cyclable realisee avenue Maurice Plantier. Cela ne prouve pas qu un parcours continu et adapte relie Aix a tous les points de Venelles.",
          "Le bon usage consiste a verifier le troncon d approche, puis a construire une boucle locale courte autour d un point connu plutot qu a suivre aveuglement une suggestion d itineraire.",
        ],
      },
      {
        title: 'Eguilles : privilegier le village, anticiper la montee',
        paragraphs: [
          "L office de tourisme communal decrit un village de ruelles, d escaliers et de reliefs entoures de collines. Le coeur ancien se prete donc davantage a une pause ou a une exploration a pied qu a une traversee rapide en trottinette.",
          "La consommation au retour dependra de ton sens de circulation et de ton point de depart. Garde une marge avant d aborder le village, meme si la distance brute parait proche.",
        ],
      },
      {
        title: 'Comparer selon ton autonomie et ton envie',
        paragraphs: [
          "Avec une batterie entamee ou un horaire serre, Venelles offre generalement un scenario plus facile a raccourcir. Pour une sortie patrimoine et panorama, Eguilles est plus distinctive mais demande une preparation plus attentive du relief et des voies d approche.",
        ],
        items: [
          'Envie de rouler sans longue pause : Venelles.',
          'Envie de visiter un village et marcher un peu : Eguilles.',
          'Vent fort, chaleur ou autonomie incertaine : reduire le rayon et fixer un demi-tour precoce.',
        ],
      },
      {
        title: 'Decision en trois controles',
        paragraphs: [
          "Entre ton depart dans la carte, compare les deux fiches, puis teste la destination retenue dans le planner. Avant de partir, confirme le revetement et les restrictions du trajet reel : ce guide compare des profils, il ne certifie pas une voie cyclable continue.",
        ],
      },
    ],
    faq: [
      {
        question: 'Venelles est-elle toujours plus facile qu Eguilles ?',
        answer: 'Non. Le point de depart, le trajet retenu et le vent peuvent changer le niveau reel. Venelles est surtout plus simple a raccourcir dans le scenario propose ici.',
      },
      {
        question: 'Peut-on traverser le centre ancien d Eguilles en trottinette ?',
        answer: 'Il faut respecter la signalisation et les zones pietonnes. Pour profiter des ruelles et des escaliers, une pause a pied est le choix le plus lisible.',
      },
    ],
    relatedSpotIds: ['venelles', 'eguilles'],
    relatedGuideSlugs: ['sortie-trottinette-aix-centre', 'sortie-trottinette-aix-weekend'],
    ctas: [
      { label: 'Situer les deux directions', to: '/carte', description: 'Comparer le nord et l ouest depuis ton depart reel.' },
      { label: 'Choisir selon ta batterie', to: '/planner', description: 'Tester Venelles puis Eguilles avec la meme marge.' },
    ],
    sources: [
      {
        label: 'Ville de Venelles - Plan velo',
        url: 'https://venelles.fr/voici-le-plan-velo-pour-venelles/',
        note: 'Programme communal d amenagements et de services, planifie sur plusieurs annees.',
      },
      {
        label: 'Ville de Venelles - Travaux et amenagements',
        url: 'https://venelles.fr/infos-pratiques/travaux-et-amenagements/les-chantiers/',
        note: 'Etat des amenagements a verifier avant le depart.',
      },
      {
        label: 'Mairie d Eguilles - Office de tourisme',
        url: 'https://mairie-eguilles.fr/les-services-municip/office-du-tourisme/',
        note: 'Description du village, de ses ruelles et de son environnement vallonne.',
      },
    ],
  },
  {
    slug: 'sortie-trottinette-salon-provence',
    title: 'Sortie trottinette Salon de Provence : quand viser l ouest d Aix',
    shortTitle: 'Sortie trottinette Salon de Provence',
    description:
      "Organisez une sortie trottinette vers Salon-de-Provence et ses environs avec une lecture plus claire de la distance, du temps et des alternatives utiles.",
    intro:
      "L ouest d Aix offre de vraies idees de sortie, mais il faut savoir quand le trajet reste raisonnable et quand il vaut mieux rapprocher le depart. L enjeu n est pas seulement la destination, mais la qualite du plan global.",
    sections: [
      {
        title: 'Ce que couvre bien ce secteur',
        paragraphs: [
          "Salon-de-Provence, La Barben ou Saint-Chamas permettent de sortir du coeur d Aix tout en restant sur des options plus lisibles que certaines tres longues destinations.",
          "Cela peut convenir a une vraie sortie week-end, avec une marge batterie un peu plus exigeante.",
        ],
      },
      {
        title: 'Le bon niveau de preparation',
        paragraphs: [
          "Il faut toujours raisonner depuis ton point de depart reel. Une meme sortie peut changer de categorie selon l endroit d ou tu pars.",
          "Le planner et la carte sont ici les deux outils les plus utiles pour eviter une lecture trop abstraite de la distance.",
        ],
      },
    ],
    faq: [
      {
        question: 'Est-ce plus simple que le Luberon ?',
        answer: 'Souvent oui, mais cela reste une sortie a verifier selon le trajet reel et la marge disponible.',
      },
      {
        question: 'Quelle erreur faut-il eviter ?',
        answer: 'Penser qu une sortie ouest est automatiquement facile parce qu elle semble plus proche sur la carte globale.',
      },
    ],
    relatedSpotIds: ['salon-de-provence', 'la-barben', 'la-fare-les-oliviers', 'saint-chamas-etang-de-berre'],
    relatedGuideSlugs: ['sortie-trottinette-venelles-eguilles', 'sortie-trottinette-luberon'],
    ctas: [
      { label: 'Voir les sorties', to: '/sorties?moment=weekend', description: 'Comparer les options week-end autour d Aix.' },
      { label: 'Voir la carte', to: '/carte', description: 'Contraster l ouest d Aix avec les autres zones.' },
      { label: 'Voir le planner', to: '/planner', description: 'Verifier la marge sur un format un peu plus long.' },
    ],
  },
  {
    slug: 'itineraire-trottinette-le-tholonet',
    title: 'Itineraire trottinette Le Tholonet : lire la zone avant de viser Sainte-Victoire',
    shortTitle: 'Itineraire trottinette Le Tholonet',
    description:
      "Preparez un itineraire trottinette au Tholonet avec plus de clarte sur les approches, la marge batterie et les liaisons a verifier.",
    intro:
      "Le Tholonet est une porte d entree utile vers Sainte-Victoire, mais il faut l aborder comme une zone d approche et non comme une promesse de parcours unique. C est ce qui le rend interessant pour une lecture locale fine.",
    sections: [
      {
        title: 'Pourquoi le Tholonet est un bon point de lecture',
        paragraphs: [
          "Le secteur permet de rester proche d Aix tout en basculant vers une ambiance plus nature. C est un bon compromis pour une sortie preparee sans aller directement sur un format trop lourd.",
          "Il offre aussi plusieurs directions possibles, d ou l importance de garder un trajet simple et une marge batterie lisible.",
        ],
      },
      {
        title: 'Comment construire un trajet utile',
        paragraphs: [
          "Pars d abord d une destination claire : Lac Zola, route Cezanne, Bimont ou Sainte-Victoire selon ton envie. Ensuite seulement, verifie le trajet reel.",
          "Le site sert ici a eviter les plans trop flous. Une destination bien choisie donne souvent une meilleure sortie qu une boucle trop ambitieuse.",
        ],
      },
    ],
    faq: [
      {
        question: 'Le Tholonet convient-il a une sortie intermediaire ?',
        answer: 'Oui, souvent. C est meme un des meilleurs paliers entre Aix centre et une vraie sortie nature.',
      },
      {
        question: 'Quelle page consulter ensuite ?',
        answer: 'La fiche du lieu retenu, puis la carte si tu veux comparer plusieurs points voisins.',
      },
    ],
    relatedSpotIds: ['le-tholonet-lac-zola', 'palette-route-cezanne', 'sainte-victoire-le-tholonet', 'barrage-de-bimont'],
    relatedGuideSlugs: ['balade-trottinette-sainte-victoire', 'sortie-trottinette-aix-centre'],
    ctas: [
      { label: 'Voir les sorties du secteur', to: '/sorties?mood=nature', description: 'Comparer les points nature proches autour d Aix.' },
      { label: 'Voir la carte', to: '/carte', description: 'Visualiser le Tholonet et les points voisins.' },
      { label: 'Voir les conseils', to: '/conseils', description: 'Garder les reflexes utiles avant une sortie relief.' },
    ],
  },
  {
    slug: 'sortie-trottinette-la-ciotat',
    title: 'Preparer une sortie en trottinette a La Ciotat depuis Aix',
    shortTitle: 'Preparer La Ciotat depuis Aix',
    description:
      "Train, voiture ou depart local : organisez une sortie trottinette a La Ciotat depuis Aix avec une autonomie et un retour realistes.",
    intro:
      "Pour profiter de La Ciotat, le premier choix n est pas la promenade sur place mais le mode d approche. Depuis Aix, un depart local ou multimodal protege la batterie et laisse plus de temps pour le littoral qu un aller-retour integral trop ambitieux.",
    sections: [
      {
        title: 'Choisir le transport avant le parcours local',
        paragraphs: [
          "Trois scenarios sont lisibles : voiture puis boucle locale, train puis sortie autour de la gare et du centre, ou trajet integral uniquement avec une autonomie et un retour alternatifs verifies. Le troisieme ne doit pas etre le choix par defaut.",
        ],
        items: [
          'Voiture : maitriser l heure de retour et conserver la batterie pour le littoral.',
          'Train : verifier les correspondances, l horaire retour et les conditions d embarquement.',
          'Depart integral depuis Aix : reserver aux projets prepares avec marge et solution de repli.',
        ],
      },
      {
        title: 'Train : verifier la chaine complete',
        paragraphs: [
          "Les recherches SNCF Connect entre Aix-en-Provence et La Ciotat peuvent proposer une correspondance, souvent via Marseille. Horaires, quais et travaux changent : consulte le trajet exact dans les deux sens le jour de la sortie.",
          "Les conditions TER pour une trottinette pliee dependent notamment de l encombrement et de l espace disponible. Elles doivent etre relues avant le voyage ; ce guide ne garantit pas l acceptation a bord.",
        ],
      },
      {
        title: 'Garder une reserve entre la gare et le littoral',
        paragraphs: [
          "La gare n est pas le point final de la sortie. Ajoute le trajet vers la zone que tu veux visiter, la circulation locale, les detours et le retour a la gare dans ton budget batterie.",
          "Le guide velo et randonnee de l office de tourisme donne des reperes locaux utiles, mais chaque voie doit encore etre controlee selon la reglementation applicable a la trottinette.",
        ],
      },
      {
        title: 'La Ciotat, Cassis ou Marseille ?',
        paragraphs: [
          "La Ciotat se prete bien a une journee centree sur une boucle littorale locale. Cassis ajoute une forte contrainte entre la gare et le centre, tandis que Marseille offre davantage de solutions de transport mais un environnement urbain plus dense.",
          "Le meilleur choix depend donc moins du nombre de kilometres annonce que de la liaison d approche, de la circulation souhaitee et de la solidite du retour.",
        ],
      },
      {
        title: 'Checklist avant depart',
        paragraphs: [
          "Teste d abord un depart local dans le planner, puis ouvre la fiche La Ciotat pour les informations de destination. La recharge eventuelle reste un bonus : une prise doit etre confirmee et accessible avec ton propre chargeur.",
        ],
        items: [
          'Billets, correspondances et dernier retour verifies dans les deux sens.',
          'Conditions de transport de la trottinette relues.',
          'Point de depart local et stationnement ou gare reperes.',
          'Marge conservee pour le retour, le vent et les detours.',
        ],
      },
    ],
    faq: [
      {
        question: 'Le train accepte-t-il toujours une trottinette ?',
        answer: 'Non. Les conditions, dimensions, espaces disponibles et perturbations doivent etre verifies avant chaque voyage.',
      },
      {
        question: 'Faut-il calculer seulement la distance sur le littoral ?',
        answer: 'Non. Il faut inclure gare ou stationnement, approche du centre, balade, detours et retour au point de depart.',
      },
      {
        question: 'Pourquoi choisir La Ciotat plutot que Cassis ?',
        answer: 'La Ciotat peut convenir a une sortie locale plus etendue. Cassis concentre davantage la contrainte sur la liaison entre gare, relief et centre.',
      },
    ],
    relatedSpotIds: ['la-ciotat', 'cassis', 'marseille-vieux-port-littoral'],
    relatedGuideSlugs: ['sortie-trottinette-cassis', 'sortie-trottinette-cote-bleue'],
    ctas: [
      { label: 'Preparer un depart local', to: '/planner', description: 'Estimer la boucle utile sans consommer la batterie sur toute l approche.' },
      { label: 'Ouvrir la fiche La Ciotat', to: '/sorties/la-ciotat', description: 'Verifier la destination une fois le mode d approche choisi.' },
      { label: 'Comparer sur la carte', to: '/carte', description: 'Situer La Ciotat, Cassis et Marseille depuis ton depart.' },
    ],
    sources: [
      {
        label: 'La Ciotat Tourisme - Guide velo et randonnee',
        url: 'https://www.destinationlaciotat.com/app/uploads/laciotat/2024/06/Guide-velo-rando-FR-2024.pdf',
        note: 'Reperes locaux a confronter aux regles applicables a la trottinette.',
      },
      {
        label: 'SNCF Connect - Horaires Aix-en-Provence vers La Ciotat',
        url: 'https://www.sncf-connect.com/train/horaires/aix-en-provence/la-ciotat',
        note: 'Horaires et correspondances variables a verifier pour chaque date.',
      },
      {
        label: 'TER Sud - Voyager avec un velo ou une trottinette',
        url: 'https://www.ter.sncf.com/sud-provence-alpes-cote-d-azur/services-contacts/voyager-avec-velo/a-bord',
        note: 'Conditions de transport sans garantie de place a bord.',
      },
    ],
  },
  {
    slug: 'sortie-trottinette-ventabren',
    title: 'Sortie trottinette Ventabren : bon compromis entre proche, calme et panorama',
    shortTitle: 'Sortie trottinette Ventabren',
    description:
      "Preparez une sortie trottinette vers Ventabren avec une lecture simple de la distance, de l ambiance et de la marge utile depuis Aix.",
    intro:
      "Ventabren fait partie des meilleurs compromis autour d Aix quand on cherche une sortie un peu plus respiree sans basculer dans un grand projet logistique. C est une bonne destination de transition entre ville et sortie plus preparee.",
    sections: [
      {
        title: 'Pourquoi Ventabren est utile dans le catalogue',
        paragraphs: [
          "La zone reste assez proche pour etre lisible, tout en donnant une vraie impression de sortie. C est souvent plus interessant qu une simple boucle urbaine si tu veux changer d ambiance sans surcharger la batterie.",
          "Elle sert aussi de palier logique avant de viser des secteurs plus longs comme Salon, la Cote Bleue ou le Luberon.",
        ],
      },
      {
        title: 'Comment bien l utiliser',
        paragraphs: [
          "Le catalogue et la carte suffisent souvent pour valider l envie, puis le planner permet de confirmer la marge si ton point de depart change.",
          "Si tu veux rouler en fin de journee, Ventabren peut rester une bonne option a condition de garder une lecture simple du retour.",
        ],
      },
    ],
    faq: [
      {
        question: 'Ventabren convient-il a une sortie du soir ?',
        answer: 'Oui dans beaucoup de cas, selon ton depart et ton autonomie disponible.',
      },
      {
        question: 'Quelle page consulter en plus ?',
        answer: 'La carte si tu veux comparer Ventabren avec Eguilles ou Venelles selon ta position.',
      },
    ],
    relatedSpotIds: ['ventabren', 'eguilles', 'venelles', 'coudoux'],
    relatedGuideSlugs: ['sortie-trottinette-venelles-eguilles', 'sortie-trottinette-aix-centre'],
    ctas: [
      { label: 'Voir la fiche Ventabren', to: '/sorties/ventabren', description: 'Relire le point principal pour cette destination proche.' },
      { label: 'Voir la carte', to: '/carte', description: 'Comparer Ventabren avec les autres sorties proches.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Verifier la marge si tu pars d un autre point qu Aix centre.' },
    ],
  },
  {
    slug: 'balade-trottinette-gardanne-fuveau',
    title: 'Balade trottinette Gardanne Fuveau : sorties intermediaires a l est d Aix',
    shortTitle: 'Balade trottinette Gardanne Fuveau',
    description:
      "Comparez Gardanne, Meyreuil, Fuveau et Trets pour une sortie trottinette intermediaire autour d Aix avec une preparation encore simple.",
    intro:
      "L est d Aix offre des sorties souvent sous-estimees pour monter progressivement en distance sans viser tout de suite une grande destination. C est utile quand tu veux rouler davantage tout en gardant un cadre encore raisonnable.",
    sections: [
      {
        title: 'Pourquoi ces sorties sont interessantes',
        paragraphs: [
          "Gardanne, Meyreuil, Fuveau ou Trets permettent de passer a un format intermediaire. On sort du tres court sans arriver dans le niveau de contrainte du littoral ou du Luberon.",
          "Cela en fait de bons terrains pour mieux comprendre ta consommation reelle de batterie et la qualite de ton plan de retour.",
        ],
      },
      {
        title: 'Comment choisir entre elles',
        paragraphs: [
          "Le planner aide a cadrer la marge, puis la carte sert a voir celle qui colle le mieux a ton point de depart du jour.",
          "Si tu veux d abord tester une progression douce, commence par la sortie la plus proche et garde les autres comme paliers.",
        ],
      },
    ],
    faq: [
      {
        question: 'Ces sorties sont-elles plus simples que Sainte-Victoire ?',
        answer: 'Souvent oui, car le relief et la logique de destination sont en general plus lisibles.',
      },
      {
        question: 'Quel usage du site est le plus utile ici ?',
        answer: 'Planner plus carte, puis une fiche detail seulement pour la destination retenue.',
      },
    ],
    relatedSpotIds: ['gardanne', 'meyreuil', 'fuveau', 'trets'],
    relatedGuideSlugs: ['balade-trottinette-sainte-victoire', 'sortie-trottinette-venelles-eguilles'],
    ctas: [
      { label: 'Voir les sorties proches', to: '/sorties?distance=7%E2%80%9315%20km', description: 'Comparer les formats intermediaires autour d Aix.' },
      { label: 'Voir la carte', to: '/carte', description: 'Visualiser l est d Aix et ses alternatives.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Tester la marge sur une sortie un peu plus longue.' },
    ],
  },
  {
    slug: 'sortie-trottinette-martigues',
    title: 'Sortie trottinette Martigues : destination eau et bord de mer a preparer',
    shortTitle: 'Sortie trottinette Martigues',
    description:
      "Preparez une sortie trottinette vers Martigues avec une lecture plus claire de la distance, du retour et de l articulation avec la Cote Bleue.",
    intro:
      "Martigues peut sembler plus simple que Marseille ou Cassis sur une carte generale, mais cela reste une destination a cadrer serieusement depuis Aix. L enjeu est de savoir si tu vises le trajet complet ou surtout la balade sur place.",
    sections: [
      {
        title: 'Le bon angle pour Martigues',
        paragraphs: [
          "Si tu veux surtout profiter du decor sur place, il peut etre plus pertinent de rapprocher le depart plutot que de tout consommer sur le trajet d approche.",
          "Martigues se lit bien dans la meme famille que la Cote Bleue : destination attractive, mais rarement sortie simple depuis Aix.",
        ],
      },
      {
        title: 'Ce qu il faut verifier',
        paragraphs: [
          "Le planner permet de voir vite si la sortie bascule en zone preparee ou trop tendue. Ensuite, la recharge et les alternatives de retour deviennent les vraies variables utiles.",
          "Il faut aussi garder une lecture concrete du temps disponible, pas seulement de la distance.",
        ],
      },
    ],
    faq: [
      {
        question: 'Martigues est-elle une sortie simple depuis Aix ?',
        answer: 'Pas dans la plupart des cas. Il faut la traiter comme une sortie longue ou partiellement preparee.',
      },
      {
        question: 'Avec quelle autre page la comparer ?',
        answer: 'Avec la Cote Bleue et la recharge, pour bien lire les contraintes communes.',
      },
    ],
    relatedSpotIds: ['martigues', 'saint-chamas-etang-de-berre', 'carry-le-rouet', 'sausset-les-pins'],
    relatedGuideSlugs: ['sortie-trottinette-cote-bleue', 'sortie-trottinette-marseille'],
    ctas: [
      { label: 'Voir la fiche Martigues', to: '/sorties/martigues', description: 'Relire la destination et son format reel.' },
      { label: 'Voir la recharge', to: '/recharge', description: 'Garder une lecture prudente des points de charge utiles.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Verifier si la sortie reste soutenable avec marge.' },
    ],
  },
  {
    slug: 'sortie-trottinette-aix-soir',
    title: 'Sortie trottinette Aix le soir : idees simples apres le travail',
    shortTitle: 'Sortie trottinette Aix le soir',
    description:
      "Trouvez une sortie trottinette du soir autour d'Aix-en-Provence avec des idees proches, une marge batterie simple et peu de logistique.",
    intro:
      "Le besoin le plus frequent autour d Aix reste souvent le meme : rouler un peu en fin de journee sans transformer la sortie en expedition. Cette page sert a isoler les formats les plus simples a lancer.",
    sections: [
      {
        title: 'Ce qui marche bien le soir autour d Aix',
        paragraphs: [
          "Les meilleurs formats du soir sont presque toujours proches, lisibles et sans pari excessif sur la recharge. L objectif est de rouler, souffler, puis rentrer sans pression inutile.",
          "Aix centre, les parcs, la Torse, la Duranne ou certaines communes proches sont plus pertinentes que les grandes destinations mer ou relief.",
        ],
      },
      {
        title: 'Comment choisir vite sans trop relire',
        paragraphs: [
          "Commence par le catalogue avec les sorties 0 a 7 km, puis garde la carte seulement si tu hesites entre deux ambiances.",
          "Le planner reste utile si ta batterie est deja entamee ou si tu pars d un autre point qu Aix centre.",
        ],
      },
    ],
    faq: [
      {
        question: 'Quelle distance viser pour une sortie du soir ?',
        answer: 'Le plus simple reste souvent 0 a 7 km, avec une vraie marge pour le retour.',
      },
      {
        question: 'Faut-il compter sur une recharge le soir ?',
        answer: 'Non. Mieux vaut partir batterie pleine et garder la recharge comme solution secondaire.',
      },
    ],
    relatedSpotIds: ['promenade-de-la-torse', 'parc-jourdan', 'parc-de-la-duranne', 'venelles'],
    relatedGuideSlugs: ['sortie-trottinette-aix-centre', 'sortie-trottinette-venelles-eguilles'],
    ctas: [
      { label: 'Voir les sorties proches', to: '/sorties?distance=0%E2%80%933%20km', description: 'Comparer les formats les plus courts pour ce soir.' },
      { label: 'Voir la carte', to: '/carte', description: 'Visualiser les points faciles a lancer autour d Aix.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Verifier la marge si la batterie est deja entamee.' },
    ],
  },
  {
    slug: 'sortie-trottinette-aix-weekend',
    title: 'Organiser un week-end en trottinette autour d Aix-en-Provence',
    shortTitle: 'Week-end en trottinette a Aix',
    description:
      "Composez un week-end en trottinette autour d'Aix avec plusieurs sorties realistes, une marge batterie et des alternatives selon la meteo.",
    intro:
      "Un bon week-end ne consiste pas a empiler les kilometres. Il combine un programme principal, une sortie courte de repli et assez de marge pour adapter le depart a la chaleur, au mistral ou a une batterie moins performante que prevu.",
    sections: [
      {
        title: 'Repartir l effort sur deux jours',
        paragraphs: [
          "Reserve la sortie la plus engagee au moment ou la batterie, la meteo et ta disponibilite sont les mieux connues. L autre demi-journee peut rester locale : centre ancien a pied, parc, Torse ou courte boucle vers la peripherie.",
          "Cette repartition evite de transformer chaque jour en test d autonomie et laisse le temps de recharger completement entre deux departs.",
        ],
        items: [
          'Programme principal : une destination nature ou village, choisie la veille.',
          'Programme de repli : une boucle courte proche d Aix, lancable sans logistique.',
          'Temps tampon : recharge complete, pause chaleur et retour avant la nuit.',
        ],
      },
      {
        title: 'Centre-ville, peripherie ou destination ?',
        paragraphs: [
          "Le centre et les parcs conviennent a une reprise, une fin de journee ou une batterie partiellement chargee. Le Tholonet, Venelles, Eguilles ou Ventabren demandent deja de verifier l approche et le retour. Bimont, Peyrolles ou les destinations plus lointaines meritent un creneau dedie.",
          "Marseille, Cassis, La Ciotat, la Cote Bleue ou le Luberon ne sont pas des extensions spontanees du programme : rapproche le depart ou organise un retour alternatif.",
        ],
      },
      {
        title: 'Budget batterie du week-end',
        paragraphs: [
          "Entre l autonomie disponible dans le planner et teste chaque sortie separement. Une recharge nocturne ne corrige ni le relief, ni le vent, ni l usure de la batterie pendant la journee.",
          "Pour une sortie longue, reserve une marge au retour et n integre une recharge intermediaire que si une prise 220V ou Schuko, son acces et le temps de charge sont confirmes.",
        ],
      },
      {
        title: 'Adapter le programme a la meteo et aux massifs',
        paragraphs: [
          "En periode chaude, pars tot et choisis un format raccourcissable. Le mistral peut augmenter l effort au retour, notamment sur les secteurs exposes. En ete, l acces aux massifs des Bouches-du-Rhone peut aussi etre limite selon le niveau de danger incendie.",
        ],
        items: [
          'Verifier la meteo et le vent avant chaque depart, pas une seule fois pour tout le week-end.',
          'Consulter les conditions d acces aux massifs le jour meme.',
          'Emporter eau, casque, antivol, chargeur et moyen de paiement.',
        ],
      },
      {
        title: 'Utiliser Aix en trott dans le bon ordre',
        paragraphs: [
          "Commence par le planner pour eliminer les projets incompatibles avec l autonomie du jour. Utilise ensuite la carte pour comparer les directions, puis ouvre la fiche de la destination retenue. La page recharge intervient en dernier, comme verification logistique et non comme promesse.",
        ],
      },
    ],
    faq: [
      {
        question: 'Faut-il planifier les deux jours a l avance ?',
        answer: 'Prepare deux options, mais decide le programme final selon la batterie, la meteo et les restrictions du jour.',
      },
      {
        question: 'Peut-on enchainer deux longues sorties ?',
        answer: 'Seulement si chaque sortie conserve sa propre marge et si la recharge entre les deux est complete. Une longue sortie plus une boucle locale reste souvent plus robuste.',
      },
      {
        question: 'Ou placer une sortie mer dans le week-end ?',
        answer: 'Dans un creneau dedie, avec depart rapproche ou retour alternatif. Elle ne doit pas etre ajoutee apres une autre sortie deja consommatrice.',
      },
    ],
    relatedSpotIds: ['barrage-de-bimont', 'lac-de-peyrolles', 'ventabren', 'le-tholonet-lac-zola'],
    relatedGuideSlugs: ['sortie-trottinette-aix-soir', 'recharge-trottinette-aix'],
    ctas: [
      { label: 'Construire le programme principal', to: '/planner', description: 'Comparer l autonomie disponible avec une destination precise.' },
      { label: 'Choisir une option de repli', to: '/sorties?distance=0%E2%80%933%20km', description: 'Garder une boucle courte autour d Aix sous la main.' },
      { label: 'Comparer les directions', to: '/carte', description: 'Visualiser les sorties nature, village et lac.' },
    ],
    sources: [
      {
        label: 'Office de tourisme d Aix-en-Provence - Transports doux',
        url: 'https://www.aixenprovencetourism.com/acces-transports/transports-doux/',
        note: 'Reperes generaux sur les mobilites douces autour d Aix.',
      },
      {
        label: 'Prefecture des Bouches-du-Rhone - Acces aux massifs',
        url: 'https://www.bouches-du-rhone.gouv.fr/Actions-de-l-Etat/Agriculture-foret-et-developpement-rural/Foret/Acces-aux-massifs/Acces-aux-massifs-forestiers-des-Bouches-du-Rhone2',
        note: 'Restrictions saisonnieres a verifier le jour de la sortie.',
      },
    ],
  },
  {
    slug: 'balade-trottinette-etang-de-berre',
    title: 'Balade trottinette etang de Berre : quand viser Saint-Chamas ou Martigues',
    shortTitle: 'Balade trottinette etang de Berre',
    description:
      "Preparez une balade trottinette vers l'etang de Berre avec une lecture claire entre sortie locale preparee, vent, marge batterie et retour.",
    intro:
      "L etang de Berre attire pour l eau, l espace et les villages, mais la zone change vite de categorie depuis Aix. Cette page sert a distinguer ce qui reste raisonnable de ce qui demande une vraie logistique.",
    sections: [
      {
        title: 'Quelle zone regarder en premier',
        paragraphs: [
          "Saint-Chamas peut servir de point d entree plus lisible, tandis que Martigues bascule souvent dans un format plus engage. Le vent reste un facteur cle sur toute la zone.",
          "Il faut raisonner en destination retenue et non en grande idee d etang a parcourir largement.",
        ],
      },
      {
        title: 'Comment arbitrer le projet',
        paragraphs: [
          "Le planner donne vite le niveau de contrainte, puis la carte aide a comparer l ouest d Aix avec la Cote Bleue voisine.",
          "Si tu veux surtout profiter de la balade sur place, rapproche le depart ou prevois un retour autrement.",
        ],
      },
    ],
    faq: [
      {
        question: 'L etang de Berre est-il une sortie simple depuis Aix ?',
        answer: 'Pas en general. Il faut la preparer selon la destination exacte et le vent du jour.',
      },
      {
        question: 'Quel point verifier en premier ?',
        answer: 'Le retour, avant meme la recharge.',
      },
    ],
    relatedSpotIds: ['saint-chamas-etang-de-berre', 'martigues', 'la-fare-les-oliviers', 'carry-le-rouet'],
    relatedGuideSlugs: ['sortie-trottinette-martigues', 'sortie-trottinette-salon-provence'],
    ctas: [
      { label: 'Voir la fiche Saint-Chamas', to: '/sorties/saint-chamas-etang-de-berre', description: 'Relire le point d entree le plus lisible sur la zone.' },
      { label: 'Voir la carte', to: '/carte', description: 'Comparer l etang de Berre avec la Cote Bleue et l ouest d Aix.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Mesurer la marge avant de viser une sortie au bord de l eau.' },
    ],
  },
  {
    slug: 'sortie-trottinette-avignon',
    title: 'Sortie trottinette Avignon : idee longue distance a organiser autrement',
    shortTitle: 'Sortie trottinette Avignon',
    description:
      "Préparez une sortie trottinette vers Avignon et l ile de la Barthelasse en gardant une lecture lucide de la distance et des alternatives de transport.",
    intro:
      "Avignon donne envie pour une vraie journee, mais ce n est pas une destination a vendre comme une sortie trottinette simple depuis Aix. Il faut la penser comme un projet hybride ou comme une sortie sur place apres transport.",
    sections: [
      {
        title: 'Pourquoi il faut changer de logique',
        paragraphs: [
          "Sur ce type de destination, l important n est pas de prouver qu un aller est possible, mais de garder une journee encore exploitable et un retour fiable.",
          "Le site aide ici a remettre le projet a la bonne echelle : sortie lointaine, a organiser differemment.",
        ],
      },
      {
        title: 'Comment l utiliser intelligemment',
        paragraphs: [
          "Le meilleur usage est souvent d ouvrir la fiche Avignon, puis de revenir au planner pour mesurer l ecart avec ton profil batterie reel.",
          "Si l objectif principal est la balade locale sur place, un transport d approche n est pas un plan B, mais souvent la forme la plus logique du projet.",
        ],
      },
    ],
    faq: [
      {
        question: 'Avignon est-elle compatible avec une sortie simple en trottinette ?',
        answer: 'Non. Il faut la classer parmi les destinations longues avec autre mode de transport ou plan de retour fort.',
      },
      {
        question: 'Que faut-il verifier en premier ?',
        answer: 'Le temps total de la journee, la marge batterie et le mode de retour.',
      },
    ],
    relatedSpotIds: ['avignon-ile-de-la-barthelasse', 'voie-verte-du-calavon', 'luberon-roussillon'],
    relatedGuideSlugs: ['sortie-trottinette-luberon', 'sortie-trottinette-salon-provence'],
    ctas: [
      { label: 'Voir la fiche Avignon', to: '/sorties/avignon-ile-de-la-barthelasse', description: 'Relire la destination longue distance.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Mesurer l ecart avec ton autonomie disponible.' },
      { label: 'Voir les conseils', to: '/conseils', description: 'Relire les erreurs a eviter sur les sorties longues.' },
    ],
  },
  {
    slug: 'recharge-trottinette-cassis-marseille',
    title: 'Recharge et autonomie pour une sortie vers Marseille ou Cassis',
    shortTitle: 'Autonomie Marseille ou Cassis',
    description:
      "Comparez Marseille et Cassis pour preparer l'autonomie, le point de depart, une recharge verifiee et une strategie de retour depuis Aix.",
    intro:
      "Marseille et Cassis posent un probleme different des sorties locales : il faut conserver de l energie pour circuler sur place et garantir le retour. Une borne visible sur une carte ne resout pas ce budget tant qu une prise compatible et son acces ne sont pas confirmes.",
    sections: [
      {
        title: 'Calculer trois budgets, pas un seul aller-retour',
        paragraphs: [
          "Separe l approche, la circulation locale et le retour. Ajoute ensuite une marge de securite pour le relief, le vent, les detours et la baisse de rendement de la batterie. Le resultat reste une estimation indicative a verifier.",
        ],
        items: [
          'Approche : depuis Aix, une gare, un parking ou un autre point de depart.',
          'Usage local : port, littoral, detours et recherche d un stationnement sur.',
          'Retour : trajet jusqu au train, a la voiture ou au domicile, avec reserve.',
        ],
      },
      {
        title: 'Marseille : plus de solutions, plus de circulation',
        paragraphs: [
          "Marseille offre plusieurs points d approche et davantage de services, mais les distances internes et la circulation peuvent consommer du temps et de la batterie. Choisis un secteur precis plutot que de compter sur une grande boucle urbaine improvisee.",
          "Un retour en transport peut etre envisage, mais ses horaires et les conditions d embarquement de la trottinette doivent etre verifies avant le depart.",
        ],
      },
      {
        title: 'Cassis : integrer la liaison gare-centre et le relief',
        paragraphs: [
          "L office de tourisme indique que la gare se situe a environ trois kilometres du centre, avec une liaison en pente et une navette selon les horaires. Une arrivee en train ne supprime donc pas le budget batterie local.",
          "Le centre et le port peuvent aussi imposer de marcher dans les secteurs pietons ou reglementes. Au retour, conserve l energie necessaire pour rejoindre la gare ou ton point de stationnement.",
        ],
      },
      {
        title: 'Une borne voiture n est pas une prise trottinette',
        paragraphs: [
          "La base nationale IRVE recense des infrastructures de recharge pour vehicules electriques. Elle ne garantit pas une prise domestique 220V ou Schuko utilisable avec un chargeur de trottinette.",
          "Avant d inclure une recharge, confirme le connecteur, l autorisation, les horaires, la duree disponible et la possibilite de rester pres de la trottinette. Sans confirmation, considere la recharge indisponible.",
        ],
      },
      {
        title: 'Strategie de retour',
        paragraphs: [
          "Si le planner classe la sortie comme trop longue, rapproche le depart avant de chercher une prise. Si elle reste limite, fixe un seuil de demi-tour et un retour alternatif. La page recharge sert a controler une solution deja identifiee ; le guide general recharge autour d Aix reste la reference pour comprendre les statuts.",
        ],
        items: [
          'Scenario A : depart local, boucle courte, retour au meme point.',
          'Scenario B : approche multimodale, horaire retour verrouille, marge gare incluse.',
          'Scenario C : recharge confirmee, mais retour encore possible sans charge complete.',
        ],
      },
    ],
    faq: [],
    relatedSpotIds: ['cassis', 'marseille-vieux-port-littoral'],
    relatedGuideSlugs: ['recharge-trottinette-aix', 'sortie-trottinette-cassis', 'sortie-trottinette-marseille'],
    ctas: [
      { label: 'Tester le point de depart', to: '/planner', description: 'Comparer un depart depuis Aix avec un depart rapproche.' },
      { label: 'Controler une solution de recharge', to: '/recharge', description: 'Distinguer prise 220V, borne voiture et acces a verifier.' },
    ],
    sources: [
      {
        label: 'Cassis Tourisme - Venir a Cassis',
        url: 'https://www.ot-cassis.com/infos-pratiques/venir-a-cassis-transports/',
        note: 'Distance et liaison entre la gare, les Gorguettes et le centre.',
      },
      {
        label: 'Cassis Tourisme - Se deplacer a Cassis',
        url: 'https://www.ot-cassis.com/infos-pratiques/se-deplacer-a-cassis/',
        note: 'Navettes, zones pietonnes et contraintes locales a verifier.',
      },
      {
        label: 'Base nationale des IRVE',
        url: 'https://transport.data.gouv.fr/datasets/base-nationale-des-irve-data-gouv-infrastructures-de-recharge-pour-vehicules-electriques-donnees-statiques',
        note: 'Registre des bornes pour vehicules electriques, distinct d un inventaire de prises 220V pour trottinettes.',
      },
    ],
  },
];

export function getEditorialGuidePath(slug: string) {
  return `/guides/${slug}`;
}

export function findEditorialGuide(slug?: string | null) {
  return editorialGuides.find((guide) => guide.slug === slug);
}
