export const SITE_NAME = 'Aix en trott';
export const SITE_URL = 'https://aixentrott.fr';
export const SITE_DEFAULT_TITLE = "Aix en trott | Sorties en trottinette autour d'Aix-en-Provence";
export const SITE_DEFAULT_DESCRIPTION =
  "Preparez vos sorties en trottinette electrique autour d'Aix-en-Provence : idees locales, carte, recharge, autonomie et conseils pratiques.";
export const SITE_DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const importMetaEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
export const SITE_GOOGLE_VERIFICATION =
  importMetaEnv?.VITE_GOOGLE_SITE_VERIFICATION || 'vKJnekj9NI1OX40vKYcNXFT6S8lSfqrYhDMiHDc-P3w';

// TODO: replace with the definitive support address when it is ready.
export const SITE_CONTACT_EMAIL = 'devande-service@tasknote.io';

export function buildReportIssueMailto(placeName: string, pageUrl: string) {
  const subject = `Erreur Aix en trott - ${placeName}`;
  const body = [
    `Lieu : ${placeName}`,
    `Page : ${pageUrl}`,
    '',
    'Champ libre :',
  ].join('\n');

  return `mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildSiteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
