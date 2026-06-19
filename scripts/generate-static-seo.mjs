import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spots } from '../src/data/spots.ts';
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  buildSiteUrl,
} from '../src/config/site.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

function getFullTitle(title) {
  if (!title || title === SITE_NAME) {
    return SITE_DEFAULT_TITLE;
  }

  return `${title} | ${SITE_NAME}`;
}

function buildPageSeo(input) {
  const pathName = input.path ?? '/';
  return {
    title: getFullTitle(input.title),
    description: input.description ?? SITE_DEFAULT_DESCRIPTION,
    path: pathName,
    canonical: buildSiteUrl(pathName),
    image: input.image ?? SITE_DEFAULT_OG_IMAGE,
    type: input.type ?? 'website',
    robots: input.robots ?? 'index,follow',
    jsonLd: input.jsonLd ?? null,
  };
}

function buildSeoGraph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

function buildWebsiteNodes() {
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
  ];
}

function buildWebPageNode({ path, title, description, pageType = 'WebPage' }) {
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

function buildBreadcrumbNode(items) {
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

function buildItemListNode(pathName, items) {
  return {
    '@type': 'ItemList',
    '@id': `${buildSiteUrl(pathName)}#items`,
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

function buildCollectionSeoGraph({ path, title, description, items, pageType = 'CollectionPage' }) {
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

function getRechargeLabel(status) {
  if (status === 'confirmed') {
    return 'confirmee';
  }

  if (status === 'nearby') {
    return 'possible';
  }

  if (status === 'verify') {
    return 'a verifier';
  }

  return 'non connue';
}

function buildSpotSeoDescription(spot) {
  return `${spot.name}, sortie en trottinette autour d'Aix-en-Provence. ${spot.description} Distance indicative ${spot.distanceLabel}, recharge ${getRechargeLabel(spot.rechargeStatus)}.`;
}

function buildSpotSeoGraph(spot) {
  const pathName = `/sorties/${spot.id}`;
  const title = `${spot.name} - sortie trottinette autour d'Aix-en-Provence`;
  const description = buildSpotSeoDescription(spot);

  return buildSeoGraph([
    ...buildWebsiteNodes(),
    buildWebPageNode({
      path: pathName,
      title,
      description,
    }),
    buildBreadcrumbNode([
      { name: 'Accueil', path: '/' },
      { name: 'Sorties', path: '/sorties' },
      { name: spot.name, path: pathName },
    ]),
    {
      '@type': 'TouristAttraction',
      '@id': `${buildSiteUrl(pathName)}#spot`,
      name: spot.name,
      description,
      url: buildSiteUrl(pathName),
      address: {
        '@type': 'PostalAddress',
        streetAddress: spot.address,
        addressCountry: 'FR',
      },
      touristType: spot.routeType,
      isAccessibleForFree: spot.budget === '0€',
    },
  ]);
}

function injectTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    return html;
  }

  pattern.lastIndex = 0;
  return html.replace(pattern, replacement);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function applySeo(template, seo) {
  let html = template;

  html = injectTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = injectTag(
    html,
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="robots" content="${escapeHtml(seo.robots)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:type" content="${escapeHtml(seo.type)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(seo.image)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/?>/i,
    '<meta property="og:image:alt" content="Aix en trott" />',
  );
  html = injectTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  );
  html = injectTag(
    html,
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(seo.image)}" />`,
  );
  html = injectTag(
    html,
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
  );
  html = html.replace(/\s*<script type="application\/ld\+json" data-seo-jsonld="page">[\s\S]*?<\/script>/i, '');

  if (seo.jsonLd) {
    const jsonLd = JSON.stringify(seo.jsonLd);
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json" data-seo-jsonld="page">${jsonLd}</script>\n  </head>`,
    );
  }

  return html;
}

function buildRouteConfigs() {
  const collectionItems = spots.map((spot) => ({
    name: spot.name,
    path: `/sorties/${spot.id}`,
  }));

  return [
    {
      path: '/',
      seo: buildPageSeo({
        title: "Sorties en trottinette autour d'Aix-en-Provence",
        description:
          "Preparez vos sorties en trottinette autour d'Aix-en-Provence : carte, idees de balades, recharge, autonomie et conseils utiles.",
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/',
            title: "Sorties en trottinette autour d'Aix-en-Provence",
            description:
              "Preparez vos sorties en trottinette autour d'Aix-en-Provence : carte, idees de balades, recharge, autonomie et conseils utiles.",
          }),
        ]),
      }),
    },
    {
      path: '/planner',
      seo: buildPageSeo({
        title: 'Planner trottinette Aix : autonomie et recharge',
        description:
          "Comparez votre autonomie avec les sorties autour d'Aix-en-Provence et reperez les balades a faire sans vous mettre en limite batterie.",
        path: '/planner',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/planner',
            title: 'Planner trottinette Aix : autonomie et recharge',
            description:
              "Comparez votre autonomie avec les sorties autour d'Aix-en-Provence et reperez les balades a faire sans vous mettre en limite batterie.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Preparer ma sortie', path: '/planner' },
          ]),
        ]),
      }),
    },
    {
      path: '/sorties',
      seo: buildPageSeo({
        title: "Sorties en trottinette autour d'Aix-en-Provence",
        description:
          "Trouvez une sortie en trottinette autour d'Aix selon votre temps, votre autonomie, l'ambiance voulue et les solutions de recharge a verifier.",
        path: '/sorties',
        jsonLd: buildCollectionSeoGraph({
          path: '/sorties',
          title: "Sorties en trottinette autour d'Aix-en-Provence",
          description:
            "Trouvez une sortie en trottinette autour d'Aix selon votre temps, votre autonomie, l'ambiance voulue et les solutions de recharge a verifier.",
          items: collectionItems,
        }),
      }),
    },
    {
      path: '/carte',
      seo: buildPageSeo({
        title: 'Carte trottinette Aix : sorties et recharge',
        description:
          "Consultez la carte des sorties et points de recharge autour d'Aix-en-Provence avec geolocalisation, trajets indicatifs et reperes utiles.",
        path: '/carte',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/carte',
            title: 'Carte trottinette Aix : sorties et recharge',
            description:
              "Consultez la carte des sorties et points de recharge autour d'Aix-en-Provence avec geolocalisation, trajets indicatifs et reperes utiles.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Carte', path: '/carte' },
          ]),
        ]),
      }),
    },
    {
      path: '/recharge',
      seo: buildPageSeo({
        title: "Recharge trottinette autour d'Aix-en-Provence",
        description:
          "Reperez les prises 220V confirmees, les recharges possibles a verifier et les bornes voiture a eviter pour une trottinette electrique.",
        path: '/recharge',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/recharge',
            title: "Recharge trottinette autour d'Aix-en-Provence",
            description:
              "Reperez les prises 220V confirmees, les recharges possibles a verifier et les bornes voiture a eviter pour une trottinette electrique.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Recharge', path: '/recharge' },
          ]),
        ]),
      }),
    },
    {
      path: '/conseils',
      seo: buildPageSeo({
        title: 'Conseils trottinette electrique autour d Aix',
        description:
          "Retrouvez les conseils utiles pour rouler autour d'Aix-en-Provence : autonomie, equipement, chaleur, recharge et points de vigilance.",
        path: '/conseils',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/conseils',
            title: 'Conseils trottinette electrique autour d Aix',
            description:
              "Retrouvez les conseils utiles pour rouler autour d'Aix-en-Provence : autonomie, equipement, chaleur, recharge et points de vigilance.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Conseils', path: '/conseils' },
          ]),
        ]),
      }),
    },
    {
      path: '/a-propos',
      seo: buildPageSeo({
        title: 'A propos de Aix en trott',
        description:
          "Comprenez l'objectif du site, les limites des donnees et ce qu'il faut verifier avant une sortie en trottinette autour d'Aix-en-Provence.",
        path: '/a-propos',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/a-propos',
            title: 'A propos de Aix en trott',
            description:
              "Comprenez l'objectif du site, les limites des donnees et ce qu'il faut verifier avant une sortie en trottinette autour d'Aix-en-Provence.",
            pageType: 'AboutPage',
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'A propos', path: '/a-propos' },
          ]),
        ]),
      }),
    },
    ...spots.map((spot) => ({
      path: `/sorties/${spot.id}`,
      seo: buildPageSeo({
        title: `${spot.name} - sortie trottinette autour d'Aix`,
        description: buildSpotSeoDescription(spot),
        type: 'article',
        path: `/sorties/${spot.id}`,
        jsonLd: buildSpotSeoGraph(spot),
      }),
    })),
  ];
}

async function main() {
  const template = await readFile(distIndexPath, 'utf8');
  const routes = buildRouteConfigs();

  for (const route of routes) {
    const routeHtml = applySeo(template, route.seo);
    const targetPath =
      route.path === '/'
        ? distIndexPath
        : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, routeHtml, 'utf8');
  }

  console.log(`Generated static SEO HTML for ${routes.length} routes.`);
  console.log(`Root canonical: ${buildSiteUrl('/')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
