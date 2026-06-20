export type EditorialGuideSection = {
  title: string;
  paragraphs: string[];
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
    title: 'Sortie trottinette Cote Bleue : comment viser le bon format de bord de mer',
    shortTitle: 'Sortie trottinette Cote Bleue',
    description:
      "Preparez une sortie trottinette sur la Cote Bleue avec les bons reperes entre distance, recharge et retour a anticiper.",
    intro:
      "La Cote Bleue attire par son cadre, mais les sorties y deviennent vite longues depuis Aix. Le sujet n est pas seulement la beaute du bord de mer, mais le format realiste de trajet et la securisation du retour.",
    sections: [
      {
        title: 'Les secteurs a regarder',
        paragraphs: [
          "Carry-le-Rouet, Sausset-les-Pins, Ensuès-la-Redonne ou Niolon n impliquent pas tous le meme engagement. Il faut choisir en fonction du temps disponible et non d une envie trop large de littoral.",
          "Les solutions train ou voiture peuvent faire partie d un bon plan, surtout si tu veux privilegier la balade sur place.",
        ],
      },
      {
        title: 'Le bon niveau de prudence',
        paragraphs: [
          "Sur ce type de destination, une trottinette donnee pour 30 km ne doit pas te faire croire a une sortie simple. Il faut raisonner avec marge batterie reelle.",
          "Le catalogue te sert ici a distinguer les envies mer qui restent jouables de celles qui demandent une vraie logistique.",
        ],
      },
    ],
    faq: [
      {
        question: 'La Cote Bleue est-elle une sortie du soir ?',
        answer: 'Pas depuis Aix dans la plupart des cas. Il faut plutot la voir comme une sortie preparee.',
      },
      {
        question: 'Que verifier en premier ?',
        answer: 'Le trajet aller-retour indicatif, le vent et le plan de retour.',
      },
    ],
    relatedSpotIds: ['carry-le-rouet', 'sausset-les-pins', 'ensues-la-redonne', 'niolon'],
    relatedGuideSlugs: ['sortie-trottinette-cassis', 'sortie-trottinette-la-ciotat'],
    ctas: [
      { label: 'Voir la carte', to: '/carte', description: 'Comparer les points mer les plus pertinents.' },
      { label: 'Voir le planner', to: '/planner', description: 'Tester si la sortie reste compatible avec ta marge.' },
      { label: 'Voir la recharge', to: '/recharge', description: 'Ne pas compter sur une borne sans prise verifiee.' },
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
    title: 'Sortie trottinette Venelles Eguilles : alternatives proches autour d Aix',
    shortTitle: 'Sortie trottinette Venelles Eguilles',
    description:
      "Trouvez des sorties trottinette proches autour de Venelles, Eguilles et Ventabren pour un format simple, local et plus lisible.",
    intro:
      "Quand tu veux rouler autour d Aix sans partir loin, les communes proches sont souvent les meilleures options. Elles permettent de sortir vite, de garder une marge batterie confortable et de rester sur un plan simple.",
    sections: [
      {
        title: 'Pourquoi ces secteurs sont utiles',
        paragraphs: [
          "Venelles, Eguilles, Ventabren ou Rognes donnent acces a des sorties proches qui restent interessantes sans exiger une logistique lourde.",
          "Ce sont de bons territoires pour varier les ambiances tout en gardant la meme base de preparation.",
        ],
      },
      {
        title: 'Quand les choisir',
        paragraphs: [
          "Si tu hesites entre une longue sortie et un projet plus simple, ces zones sont souvent le meilleur arbitrage. Tu roules davantage que dans Aix centre, sans basculer tout de suite dans le long format.",
          "Le catalogue et la carte suffisent souvent pour trancher rapidement entre elles.",
        ],
      },
    ],
    faq: [
      {
        question: 'Ces sorties conviennent-elles au soir ?',
        answer: 'Oui pour plusieurs d entre elles, selon ton point de depart et ton autonomie restante.',
      },
      {
        question: 'Quelle page consulter en plus ?',
        answer: 'La carte pour voir laquelle est la plus proche de ton depart du jour.',
      },
    ],
    relatedSpotIds: ['venelles', 'eguilles', 'ventabren', 'rognes'],
    relatedGuideSlugs: ['sortie-trottinette-aix-centre', 'balade-trottinette-peyrolles'],
    ctas: [
      { label: 'Voir les sorties proches', to: '/sorties?distance=3%E2%80%937%20km', description: 'Comparer les formats proches autour d Aix.' },
      { label: 'Voir la carte', to: '/carte', description: 'Visualiser rapidement les communes voisines.' },
      { label: 'Voir le planner', to: '/planner', description: 'Ajouter une marge simple avant de partir.' },
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
    title: 'Sortie trottinette La Ciotat : destination mer a traiter avec marge',
    shortTitle: 'Sortie trottinette La Ciotat',
    description:
      "Organisez une sortie trottinette vers La Ciotat avec une lecture claire de la distance, de la recharge et du retour a preparer.",
    intro:
      "La Ciotat fait partie des destinations mer les plus enviees, mais elle demande la meme rigueur que Cassis ou Marseille. Il faut l envisager comme une sortie longue, pas comme une promenade sans contrainte.",
    sections: [
      {
        title: 'Le vrai sujet de cette sortie',
        paragraphs: [
          "Le probleme n est pas seulement de rejoindre La Ciotat, mais de garder encore assez de batterie pour profiter du lieu et revenir.",
          "Si la balade sur place est ta priorite, il peut etre plus intelligent de rapprocher le depart que de consommer toute l energie sur l approche.",
        ],
      },
      {
        title: 'Comment la rendre plus realiste',
        paragraphs: [
          "Le planner permet de savoir vite si tu es en zone compatible, limite ou a eviter. Ensuite, la fiche et la recharge servent a valider les details utiles.",
          "Sur ce type de destination, mieux vaut une sortie courte sur place bien construite qu un aller-retour trop ambitieux.",
        ],
      },
    ],
    faq: [
      {
        question: 'La Ciotat est-elle une sortie simple depuis Aix ?',
        answer: 'Non. Il faut la classer parmi les sorties longues a forte contrainte batterie.',
      },
      {
        question: 'Quel est le meilleur plan B ?',
        answer: 'Un retour alternatif ou un depart rapproche plutot qu une confiance excessive dans la recharge.',
      },
    ],
    relatedSpotIds: ['la-ciotat', 'cassis', 'marseille-vieux-port-littoral'],
    relatedGuideSlugs: ['sortie-trottinette-cassis', 'sortie-trottinette-cote-bleue'],
    ctas: [
      { label: 'Voir la fiche La Ciotat', to: '/sorties/la-ciotat', description: 'Relire les infos principales de la destination.' },
      { label: 'Ouvrir le planner', to: '/planner', description: 'Verifier si ton autonomie couvre vraiment le projet.' },
      { label: 'Voir la recharge', to: '/recharge', description: 'Ne compter que sur des prises compatibles verifiees.' },
    ],
  },
];

export function getEditorialGuidePath(slug: string) {
  return `/guides/${slug}`;
}

export function findEditorialGuide(slug?: string | null) {
  return editorialGuides.find((guide) => guide.slug === slug);
}
