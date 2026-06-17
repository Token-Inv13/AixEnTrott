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
