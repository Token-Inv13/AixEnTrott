export const LEGAL_PUBLISHER = {
  name: 'Kevin TAIEB',
  status: 'Entrepreneur individuel (EI)',
  addressLines: [
    '1550 chemin de Saint-Hilaire',
    '13290 Aix-en-Provence',
    'France',
  ],
  phoneDisplay: '09 81 28 99 91',
  phoneHref: '+33981289991',
  siren: '843 072 968',
  publicationDirector: 'Kevin TAIEB',
  email: 'aixentrott@tokenbuilds.site',
} as const;

export const TECHNICAL_HOST = {
  name: 'Vercel Inc.',
  addressLines: [
    '440 N Barranca Avenue #4133',
    'Covina, CA 91723',
    'Etats-Unis',
  ],
  dmcaPhoneDisplay: '+1 559 288 7060',
  privacyEmail: 'privacy@vercel.com',
  privacyNoticeUrl: 'https://vercel.com/legal/privacy-notice',
  dmcaPolicyUrl: 'https://vercel.com/legal/dmca-policy',
} as const;

export const EDITORIAL_METHOD =
  "Les contenus d'Aix en trott sont elabores a partir de donnees cartographiques, de sources publiques accessibles en ligne et de calculs techniques internes. Les distances, durees, estimations d'autonomie, informations de recharge et conditions de parcours sont fournies a titre indicatif et peuvent evoluer. Certaines informations font l'objet de verifications a distance, mais les parcours ne sont pas systematiquement testes physiquement. Les utilisateurs sont invites a verifier les conditions locales avant leur depart et peuvent signaler toute information incorrecte ou obsolete.";

export const CONTACT_REASONS = [
  'Signaler une information incorrecte ou obsolete',
  'Suggerer une sortie',
  'Poser une question concernant le site',
  'Exercer un droit relatif aux donnees personnelles',
] as const;
