import type { Spot } from '../data/spots';
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildSiteUrl,
} from '../config/site';

type BreadcrumbItem = {
  name: string;
  path: string;
};

type SeoListItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  name: string;
  text: string;
  path?: string;
};

export type PageSeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  robots?: string;
  jsonLd?: Record<string, unknown> | null;
};

export function getFullTitle(title?: string) {
  if (!title || title === SITE_NAME) {
    return SITE_DEFAULT_TITLE;
  }

  return `${title} | ${SITE_NAME}`;
}

export function getSeoDefaults() {
  return {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    path: '/',
    image: SITE_DEFAULT_OG_IMAGE,
    type: 'website' as const,
    robots: 'index,follow',
  };
}

export function buildPageSeo(input: PageSeoInput) {
  const defaults = getSeoDefaults();
  const path = input.path ?? defaults.path;
  const title = getFullTitle(input.title);
  const description = input.description ?? defaults.description;
  const image = input.image ?? defaults.image;
  const canonical = buildSiteUrl(path);

  return {
    title,
    description,
    path,
    canonical,
    image,
    type: input.type ?? defaults.type,
    robots: input.robots ?? defaults.robots,
    jsonLd: input.jsonLd ?? null,
  };
}

export function buildSeoGraph(nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function buildWebsiteNodes() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: SITE_DEFAULT_OG_IMAGE,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
    },
    buildSiteNavigationNode([
      { name: 'Accueil', path: '/' },
      { name: 'Preparer', path: '/planner' },
      { name: 'Sorties', path: '/sorties' },
      { name: 'Carte', path: '/carte' },
      { name: 'Guides', path: '/guides' },
      { name: 'Recharge', path: '/recharge' },
      { name: 'Conseils', path: '/conseils' },
    ]),
  ];
}

export function buildSiteNavigationNode(items: SeoListItem[]) {
  return {
    '@type': 'SiteNavigationElement',
    '@id': `${SITE_URL}#navigation`,
    name: items.map((item) => item.name),
    url: items.map((item) => buildSiteUrl(item.path)),
  };
}

export function buildWebPageNode({
  path,
  title,
  description,
  pageType = 'WebPage',
}: {
  path: string;
  title: string;
  description: string;
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage';
}) {
  return {
    '@type': pageType,
    '@id': `${buildSiteUrl(path)}#webpage`,
    url: buildSiteUrl(path),
    name: title,
    description,
    isPartOf: {
      '@id': `${SITE_URL}#website`,
    },
    inLanguage: 'fr-FR',
  };
}

export function buildBreadcrumbNode(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildSiteUrl(item.path),
    })),
  };
}

export function buildItemListNode(path: string, items: SeoListItem[]) {
  return {
    '@type': 'ItemList',
    '@id': `${buildSiteUrl(path)}#items`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: buildSiteUrl(item.path),
      name: item.name,
    })),
  };
}

export function buildFaqPageNode(path: string, items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${buildSiteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildHowToNode(path: string, name: string, steps: HowToStep[]) {
  return {
    '@type': 'HowTo',
    '@id': `${buildSiteUrl(path)}#howto`,
    name,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.path ? buildSiteUrl(step.path) : undefined,
    })),
  };
}

export function buildSpotSeoDescription(spot: Spot) {
  return `${spot.name}, sortie en trottinette autour d'Aix-en-Provence. ${spot.description} Distance indicative ${spot.distanceLabel}, recharge ${spot.rechargeStatus === 'confirmed' ? 'confirmee' : spot.rechargeStatus === 'nearby' ? 'possible' : spot.rechargeStatus === 'verify' ? 'a verifier' : 'non connue'}.`;
}

export function buildSpotSeoGraph(spot: Spot) {
  const path = `/sorties/${spot.id}`;
  const title = `${spot.name} - sortie trottinette autour d'Aix-en-Provence`;
  const description = buildSpotSeoDescription(spot);

  return buildSeoGraph([
    ...buildWebsiteNodes(),
    buildWebPageNode({
      path,
      title,
      description,
    }),
    buildBreadcrumbNode([
      { name: 'Accueil', path: '/' },
      { name: 'Sorties', path: '/sorties' },
      { name: spot.name, path },
    ]),
    {
      '@type': 'TouristAttraction',
      '@id': `${buildSiteUrl(path)}#spot`,
      name: spot.name,
      description,
      url: buildSiteUrl(path),
      address: {
        '@type': 'PostalAddress',
        streetAddress: spot.address,
        addressCountry: 'FR',
      },
      touristType: spot.routeType,
      isAccessibleForFree: /^0/.test(spot.budget),
    },
  ]);
}

export function buildCollectionSeoGraph({
  path,
  title,
  description,
  items,
  pageType = 'CollectionPage',
}: {
  path: string;
  title: string;
  description: string;
  items: SeoListItem[];
  pageType?: 'CollectionPage' | 'AboutPage' | 'WebPage';
}) {
  return buildSeoGraph([
    ...buildWebsiteNodes(),
    buildWebPageNode({
      path,
      title,
      description,
      pageType,
    }),
    buildBreadcrumbNode([
      { name: 'Accueil', path: '/' },
      { name: title, path },
    ]),
    buildItemListNode(path, items),
  ]);
}

