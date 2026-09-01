import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chargingPoints, compatibilityLabels } from '../src/data/chargingPoints.ts';
import { editorialGuides, getEditorialGuidePath } from '../src/data/editorialPages.ts';
import { spots } from '../src/data/spots.ts';
import {
  CONTACT_REASONS,
  EDITORIAL_METHOD,
  LEGAL_PUBLISHER,
  TECHNICAL_HOST,
} from '../src/data/institutional.ts';
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

function dedupeBy(items, getKey) {
  return [...new Map(items.map((item) => [getKey(item), item])).values()];
}

const uniqueSpots = dedupeBy(spots, (spot) => spot.id);
const spotById = new Map(uniqueSpots.map((spot) => [spot.id, spot]));
const guideBySlug = new Map(editorialGuides.map((guide) => [guide.slug, guide]));

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
      '@type': 'Person',
      '@id': `${SITE_URL}#publisher`,
      name: LEGAL_PUBLISHER.name,
      url: SITE_URL,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr-FR',
      publisher: {
        '@id': `${SITE_URL}#publisher`,
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

function buildSiteNavigationNode(items) {
  return {
    '@type': 'SiteNavigationElement',
    '@id': `${SITE_URL}#navigation`,
    name: items.map((item) => item.name),
    url: items.map((item) => buildSiteUrl(item.path)),
  };
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

function buildFaqPageNode(pathName, items) {
  return {
    '@type': 'FAQPage',
    '@id': `${buildSiteUrl(pathName)}#faq`,
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

function buildHowToNode(pathName, name, steps) {
  return {
    '@type': 'HowTo',
    '@id': `${buildSiteUrl(pathName)}#howto`,
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
      isAccessibleForFree: /^0/.test(spot.budget),
    },
  ]);
}

function buildGuideSeoGraph(guide) {
  const pathName = getEditorialGuidePath(guide.slug);

  return buildSeoGraph([
    ...buildWebsiteNodes(),
    buildWebPageNode({
      path: pathName,
      title: guide.title,
      description: guide.description,
    }),
    buildBreadcrumbNode([
      { name: 'Accueil', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: guide.shortTitle, path: pathName },
    ]),
    {
      '@type': 'FAQPage',
      '@id': `${buildSiteUrl(pathName)}#faq`,
      mainEntity: guide.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
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
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const navItems = [
  { path: '/', label: 'Accueil' },
  { path: '/planner', label: 'Preparer' },
  { path: '/sorties', label: 'Sorties' },
  { path: '/carte', label: 'Carte' },
  { path: '/recharge', label: 'Recharge' },
  { path: '/conseils', label: 'Conseils' },
];

const footerItems = [
  ...navItems.slice(0, 1),
  { path: '/sorties', label: 'Sorties' },
  { path: '/carte', label: 'Carte' },
  { path: '/guides', label: 'Guides' },
  { path: '/recharge', label: 'Recharge' },
  { path: '/conseils', label: 'Conseils' },
  { path: '/a-propos', label: 'A propos' },
];

const institutionalFooterItems = [
  { path: '/contact', label: 'Contact' },
  { path: '/mentions-legales', label: 'Mentions legales' },
  { path: '/confidentialite', label: 'Confidentialite' },
];

function isActiveRoute(currentPath, itemPath) {
  if (itemPath === '/') {
    return currentPath === '/';
  }

  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
}

function renderNavigation(currentPath, mobile = false) {
  const wrapperClass = mobile
    ? 'mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1'
    : 'hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex';

  return `<nav class="${wrapperClass}" aria-label="Navigation principale">${navItems
    .map((item) => {
      const activeClass = isActiveRoute(currentPath, item.path)
        ? 'bg-sky text-white shadow-soft'
        : 'text-slate-600 hover:bg-white hover:text-slate-950';
      return `<a href="${escapeHtml(item.path)}" class="rounded-full px-4 py-2 text-sm font-medium transition ${activeClass}">${escapeHtml(item.label)}</a>`;
    })
    .join('')}</nav>`;
}

function renderStaticShell(currentPath, content) {
  return `<div class="app-shell min-h-screen" data-static-seo-shell>
    <header class="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" class="flex items-center" aria-label="Aix en trott, retour a l'accueil">
          <img src="/logo-horizontal.png" alt="Aix en trott" class="h-10 w-auto max-w-[176px] sm:h-12 sm:max-w-[208px]" />
        </a>
        ${renderNavigation(currentPath)}
      </div>
      <div class="border-t border-slate-100 bg-white/80 px-4 py-2 md:hidden">${renderNavigation(currentPath, true)}</div>
    </header>
    <main>${content}</main>
    <footer class="border-t border-slate-200/70 bg-white/75">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="grid gap-5 border-t border-slate-200/60 pt-6 text-sm text-slate-500 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-end">
          <p class="max-w-xl">Site independant. Distances, autonomie, pistes cyclables et recharge a verifier avant depart.</p>
          <div class="grid gap-3">
            <nav class="flex flex-wrap gap-x-4 gap-y-2" aria-label="Navigation de pied de page">${footerItems
              .map((item) => `<a href="${escapeHtml(item.path)}" class="font-medium text-slate-600">${escapeHtml(item.label)}</a>`)
              .join('')}</nav>
            <nav class="flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200/70 pt-3" aria-label="Informations legales et confidentialite">${institutionalFooterItems
              .map((item) => `<a href="${escapeHtml(item.path)}" class="font-medium text-slate-600">${escapeHtml(item.label)}</a>`)
              .join('')}<button type="button" class="font-medium text-slate-600">Parametres de confidentialite</button></nav>
          </div>
        </div>
      </div>
    </footer>
  </div>`;
}

function renderHeading(title, description, kicker = '') {
  return `${kicker ? `<p class="text-xs font-semibold uppercase tracking-[0.24em] text-sky">${escapeHtml(kicker)}</p>` : ''}
    <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">${escapeHtml(title)}</h1>
    <p class="mt-3 max-w-3xl text-base leading-7 text-slate-600">${escapeHtml(description)}</p>`;
}

function renderSpotCard(spot) {
  return `<article class="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sky">${escapeHtml(spot.distanceLabel)} - distance indicative</p>
    <h3 class="mt-2 text-lg font-semibold text-slate-950"><a href="/sorties/${escapeHtml(spot.id)}">${escapeHtml(spot.name)}</a></h3>
    <p class="mt-2 text-sm leading-6 text-slate-600">${escapeHtml(spot.description)}</p>
    <p class="mt-3 text-sm text-slate-500">${escapeHtml(spot.duration)} - budget ${escapeHtml(spot.budget)} - recharge ${escapeHtml(getRechargeLabel(spot.rechargeStatus))}</p>
    <a href="/sorties/${escapeHtml(spot.id)}" class="mt-4 inline-flex text-sm font-semibold text-sky">Voir la fiche</a>
  </article>`;
}

function renderGuideCard(guide) {
  const guidePath = getEditorialGuidePath(guide.slug);
  return `<article class="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
    <h3 class="text-lg font-semibold text-slate-950"><a href="${escapeHtml(guidePath)}">${escapeHtml(guide.shortTitle)}</a></h3>
    <p class="mt-2 text-sm leading-6 text-slate-600">${escapeHtml(guide.description)}</p>
    <a href="${escapeHtml(guidePath)}" class="mt-4 inline-flex text-sm font-semibold text-sky">Lire le guide</a>
  </article>`;
}

function renderPageContainer(heading, sections) {
  return `<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">${heading}${sections}</div>`;
}

function buildHomeStaticContent() {
  const featuredSpots = uniqueSpots.slice(0, 6);
  const featuredGuides = editorialGuides.slice(0, 4);

  return renderPageContainer(
    `<section class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      ${renderHeading(
        "Prepare ta sortie en trottinette autour d'Aix-en-Provence",
        "Sorties, carte et recharge autour d'Aix pour preparer plus vite.",
        'Aix en trott',
      )}
      <p class="mt-4 max-w-3xl text-base leading-7 text-slate-600">Des idees triees par distance, ambiance et recharge, avec une lecture simple de l'autonomie.</p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a href="/planner" class="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Preparer ma sortie</a>
        <a href="/sorties" class="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Voir les sorties</a>
        <a href="/recharge" class="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">Verifier la recharge</a>
      </div>
    </section>`,
    `<section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
      <h2 class="text-2xl font-semibold text-slate-950">Comment utiliser le site ?</h2>
      <ol class="mt-4 grid gap-3 text-sm leading-6 text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
        <li>1. Choisis ton temps disponible.</li><li>2. Filtre par distance ou ambiance.</li><li>3. Verifie l'autonomie et la recharge.</li><li>4. Pars avec batterie pleine, eau, casque et antivol.</li>
      </ol>
    </section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Sorties autour d'Aix</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${featuredSpots.map(renderSpotCard).join('')}</div><a href="/sorties" class="mt-5 inline-flex font-semibold text-sky">Voir toutes les sorties</a></section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Guides pratiques</h2><div class="mt-4 grid gap-4 md:grid-cols-2">${featuredGuides.map(renderGuideCard).join('')}</div><a href="/guides" class="mt-5 inline-flex font-semibold text-sky">Voir tous les guides</a></section>`,
  );
}

function buildSortiesStaticContent() {
  return renderPageContainer(
    renderHeading('Sorties autour d\'Aix', 'Filtre les sorties par distance, ambiance, budget et recharge.'),
    `<section class="mt-6"><h2 class="text-2xl font-semibold text-slate-950">Toutes les sorties</h2><p class="mt-2 text-sm leading-6 text-slate-600">Les distances restent indicatives et le trajet reel depend de ton point de depart.</p><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${uniqueSpots.map(renderSpotCard).join('')}</div></section>`,
  );
}

function buildGuidesStaticContent() {
  return renderPageContainer(
    renderHeading(
      "Guides pour preparer une sortie trottinette autour d'Aix",
      'Pages edito ciblees pour repondre aux recherches locales les plus concretes.',
    ),
    `<section class="mt-6"><h2 class="text-2xl font-semibold text-slate-950">Tous les guides</h2><p class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Autonomie, recharge et sorties locales : chaque guide rassemble les points a verifier avant le depart.</p><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${editorialGuides.map(renderGuideCard).join('')}</div></section>`,
  );
}

function buildCarteStaticContent() {
  const nearbySpots = [...uniqueSpots].sort((left, right) => left.distanceKmFromAix - right.distanceKmFromAix).slice(0, 9);
  return renderPageContainer(
    renderHeading('Carte interactive', "Compare rapidement les sorties proches et les points de recharge autour d'Aix."),
    `<section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Choisir un point de depart</h2><p class="mt-3 text-sm leading-6 text-slate-600">Utilise Aix, ta position ou une adresse pour recalculer la carte et les sorties proches. Les trajets restent indicatifs et sont a confirmer avant de partir.</p></section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Sorties proches</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${nearbySpots.map(renderSpotCard).join('')}</div><a href="/sorties" class="mt-5 inline-flex font-semibold text-sky">Comparer toutes les sorties</a></section>`,
  );
}

function buildPlannerStaticContent() {
  const localSpots = [...uniqueSpots].sort((left, right) => left.distanceKmFromAix - right.distanceKmFromAix).slice(0, 9);
  return renderPageContainer(
    renderHeading('Preparer ma sortie', 'Une estimation simple pour trier les sorties selon ton autonomie.'),
    `<section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Planification rapide</h2><p class="mt-3 text-sm leading-6 text-slate-600">Choisis ton point de depart, ton autonomie, ton type de sortie et ton niveau de prudence. Le calcul aller-retour reste indicatif, ajoute une marge de securite et doit etre verifie avant le depart.</p><ul class="mt-4 grid gap-2 text-sm text-slate-600"><li>Compatible avec marge : l'estimation reste sous l'autonomie disponible.</li><li>Possible mais limite : prevoir une marge ou une recharge verifiee.</li><li>Sortie longue : prevoir train, voiture, recharge ou retour alternatif.</li></ul></section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Sorties a comparer</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${localSpots.map(renderSpotCard).join('')}</div></section>`,
  );
}

function buildRechargeStaticContent() {
  const statusDescriptions = [
    ['Compatible 220V confirmee', 'Une prise 220V ou Schuko est explicitement indiquee.'],
    ['Prise 220V possible, a verifier', 'La compatibilite doit etre confirmee avant le depart.'],
    ['Borne voiture uniquement', "Ne pas compter dessus pour une trottinette."],
    ['Acces prive / abonnement', "Verifier les conditions d'acces et les horaires."],
    ['A verifier avant depart', 'Le type de prise et la disponibilite ne sont pas confirmes.'],
  ];
  const points = chargingPoints
    .map(
      (point) => `<article class="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sky">${escapeHtml(compatibilityLabels[point.compatibility])}</p><h3 class="mt-2 text-lg font-semibold text-slate-950">${escapeHtml(point.name)}</h3><p class="mt-2 text-sm text-slate-500">${escapeHtml(point.address)}, ${escapeHtml(point.city)}</p><p class="mt-3 text-sm leading-6 text-slate-600">${escapeHtml(point.notes)}</p></article>`,
    )
    .join('');

  return renderPageContainer(
    renderHeading('Recharge', 'Les points listes distinguent clairement 220V, borne voiture, acces prive et points a verifier.'),
    `<section class="mt-6 rounded-[2rem] border border-amber-200 bg-amber-50 p-6"><h2 class="text-lg font-semibold text-amber-950">Verifier la prise avant de partir</h2><p class="mt-3 text-sm leading-6 text-amber-900">Chargemap, PlugShare et Google Maps recensent surtout des bornes pour vehicules electriques. Pour une trottinette, verifie toujours la presence d'une prise 220V ou Schuko et emporte ton chargeur.</p></section>
    <section class="mt-6"><h2 class="text-2xl font-semibold text-slate-950">Comprendre les statuts</h2><div class="mt-4 grid gap-4 md:grid-cols-2">${statusDescriptions.map(([title, text]) => `<article class="rounded-[1.5rem] bg-white p-5 shadow-soft"><h3 class="font-semibold text-slate-950">${escapeHtml(title)}</h3><p class="mt-2 text-sm leading-6 text-slate-600">${escapeHtml(text)}</p></article>`).join('')}</div></section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Points de recharge reperes</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${points}</div></section>`,
  );
}

function buildConseilsStaticContent() {
  const advice = [
    "L'autonomie reelle baisse avec le vent, les cotes et le poids transporte.",
    'Pars avec la batterie pleine et emporte ton chargeur si la sortie depasse le simple aller-retour.',
    'Verifie la compatibilite 220V avant de compter sur une borne publique.',
    'Ne laisse pas la trottinette sans surveillance pendant une recharge ou une pause.',
    'Prevois antivol, eau, casque et eclairage.',
    'Verifie les fermetures de massifs en ete avant les sorties nature.',
    'Pour les sorties longues, train et trottinette reste souvent le plus simple.',
  ];
  return renderPageContainer(
    renderHeading('Conseils', 'Les meilleures sorties sont souvent les plus simples a relire avant de partir.'),
    `<section class="mt-6 grid gap-4 md:grid-cols-2">${advice.map((text) => `<article class="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft"><p class="text-base leading-7 text-slate-700">${escapeHtml(text)}</p></article>`).join('')}</section><section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-lg font-semibold text-slate-950">A ne pas faire</h2><ul class="mt-4 grid gap-3 text-sm leading-6 text-slate-600"><li>Partir avec une batterie faible.</li><li>Compter sur une borne voiture sans verifier la prise.</li><li>Laisser la trottinette seule en recharge.</li><li>Sous-estimer les cotes et le vent.</li><li>Rouler dans les massifs fermes en ete.</li></ul><a href="/guides" class="mt-5 inline-flex font-semibold text-sky">Lire les guides pratiques</a></section>`,
  );
}

function buildAboutStaticContent() {
  return renderPageContainer(
    renderHeading('A propos', 'La mission du site, sa methode et les points a verifier avant chaque sortie.'),
    `<section class="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Un guide independant et pratique</h2><p class="mt-4 text-sm leading-6 text-slate-600">Aix en trott est un site independant consacre aux sorties et aux outils pratiques pour les deplacements et balades en trottinette autour d'Aix-en-Provence et dans les destinations proposees.</p><p class="mt-4 text-sm leading-6 text-slate-600">Son objectif est d'aider a comparer une destination, une autonomie et une solution de retour sans masquer les limites du trajet.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Des informations utiles, avec leurs limites</h2><p class="mt-4 text-sm leading-6 text-slate-600">${escapeHtml(EDITORIAL_METHOD)}</p></article></section>
    <section class="mt-4 grid gap-4 lg:grid-cols-3"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Distances et itineraires</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les valeurs initiales sont indicatives. Les outils cartographiques peuvent recalculer un trajet depuis votre point de depart, mais le resultat peut varier selon le service et les conditions locales.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Batterie et autonomie</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les estimations aident a decider, sans garantir l'autonomie reelle. Batterie, relief, vitesse, temperature, vent, charge et style de conduite modifient la consommation.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Recharge</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les prises, horaires et conditions d'acces peuvent evoluer. Verifiez la compatibilite locale avant de vous deplacer et ne supposez pas qu'une borne voiture convient a une trottinette.</p></article></section>
    <section class="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Une information a actualiser ?</h2><p class="mt-3 text-sm leading-6 text-slate-600">Signalez une distance, un acces, une recharge ou une condition locale incorrecte afin que l'information puisse etre revue.</p><a href="/contact" class="mt-5 inline-flex font-semibold text-sky">Contacter Aix en trott</a></section>`,
  );
}

function buildContactStaticContent() {
  return renderPageContainer(
    renderHeading('Contact', 'Un point de contact direct, sans formulaire ni compte utilisateur.'),
    `<section class="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Nous joindre</h2><p class="mt-4 text-sm leading-6 text-slate-600"><strong>E-mail :</strong> <a href="mailto:${escapeHtml(LEGAL_PUBLISHER.email)}" class="font-semibold text-sky">${escapeHtml(LEGAL_PUBLISHER.email)}</a></p><p class="mt-3 text-sm leading-6 text-slate-600"><strong>Telephone :</strong> <a href="tel:${escapeHtml(LEGAL_PUBLISHER.phoneHref)}" class="font-semibold text-sky">${escapeHtml(LEGAL_PUBLISHER.phoneDisplay)}</a></p><a href="mailto:${escapeHtml(LEGAL_PUBLISHER.email)}" class="mt-5 inline-flex font-semibold text-sky">Envoyer un e-mail</a></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Motifs de contact</h2><ul class="mt-4 grid gap-3 sm:grid-cols-2">${CONTACT_REASONS.map((reason) => `<li class="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">${escapeHtml(reason)}</li>`).join('')}</ul><p class="mt-4 text-sm leading-6 text-slate-600">Les messages sont conserves au maximum 12 mois apres le dernier echange utile, sauf obligation legale contraire.</p></article></section>
    <section class="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Informations utiles</h2><div class="mt-4 flex flex-wrap gap-4"><a href="/a-propos" class="font-semibold text-sky">A propos</a><a href="/confidentialite" class="font-semibold text-sky">Confidentialite</a><a href="/mentions-legales" class="font-semibold text-sky">Mentions legales</a></div></section>`,
  );
}

function buildLegalNoticeStaticContent() {
  return renderPageContainer(
    renderHeading('Mentions legales', "Identite de l'editeur, hebergement et cadre d'utilisation du site."),
    `<section class="mt-6 grid gap-4 lg:grid-cols-2"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Editeur du site</h2><p class="mt-4 text-sm leading-6 text-slate-600">${escapeHtml(LEGAL_PUBLISHER.name)}<br>${escapeHtml(LEGAL_PUBLISHER.status)}<br>${LEGAL_PUBLISHER.addressLines.map(escapeHtml).join('<br>')}<br>SIREN : ${escapeHtml(LEGAL_PUBLISHER.siren)}<br>Telephone : <a href="tel:${escapeHtml(LEGAL_PUBLISHER.phoneHref)}">${escapeHtml(LEGAL_PUBLISHER.phoneDisplay)}</a><br>E-mail : <a href="mailto:${escapeHtml(LEGAL_PUBLISHER.email)}">${escapeHtml(LEGAL_PUBLISHER.email)}</a></p><p class="mt-4 text-sm leading-6 text-slate-600">Directeur de la publication : ${escapeHtml(LEGAL_PUBLISHER.publicationDirector)}.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Hebergeur technique</h2><p class="mt-4 text-sm leading-6 text-slate-600">${escapeHtml(TECHNICAL_HOST.name)}<br>${TECHNICAL_HOST.addressLines.map(escapeHtml).join('<br>')}<br>Contact confidentialite : <a href="mailto:${escapeHtml(TECHNICAL_HOST.privacyEmail)}">${escapeHtml(TECHNICAL_HOST.privacyEmail)}</a><br>Numero officiellement publie pour l'agent DMCA : ${escapeHtml(TECHNICAL_HOST.dmcaPhoneDisplay)}.</p><div class="mt-4 flex gap-4"><a href="${escapeHtml(TECHNICAL_HOST.privacyNoticeUrl)}" class="font-semibold text-sky">Politique Vercel</a><a href="${escapeHtml(TECHNICAL_HOST.dmcaPolicyUrl)}" class="font-semibold text-sky">Coordonnees officielles</a></div></article></section>
    <section class="mt-4 grid gap-4 lg:grid-cols-3"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Propriete intellectuelle</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les textes, la structure, l'identite visuelle et les contenus propres a Aix en trott sont proteges par le droit applicable. Les contenus tiers restent la propriete de leurs titulaires.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Informations et responsabilite</h2><p class="mt-3 text-sm leading-6 text-slate-600">Distances, autonomie, recharge, circulation, itineraires et conditions locales sont indicatifs et peuvent evoluer. Verifiez les conditions reelles avant de partir.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Liens externes</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les services cartographiques et sites tiers restent sous la responsabilite de leurs editeurs.</p></article></section>
    <section class="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Contact</h2><p class="mt-3 text-sm leading-6 text-slate-600">Pour toute question, consultez la <a href="/contact" class="font-semibold text-sky">page de contact</a> ou ecrivez a <a href="mailto:${escapeHtml(LEGAL_PUBLISHER.email)}" class="font-semibold text-sky">${escapeHtml(LEGAL_PUBLISHER.email)}</a>.</p></section>`,
  );
}

function buildPrivacyStaticContent() {
  const treatments = [
    ['Google Analytics 4', "G-7CQKVX43X0 mesure l'audience uniquement apres votre consentement Analytics, qui peut etre refuse ou retire."],
    ['Google AdSense', 'Google AdSense et Funding Choices gerent la diffusion publicitaire et les preferences publicitaires.'],
    ['Cartographie et itineraires', 'Google Maps, Places et Routes peuvent recevoir les coordonnees necessaires lorsque vous lancez une recherche, une localisation ou un calcul de trajet.'],
    ['Stockages locaux', "localStorage conserve le consentement Analytics et un cache de distances d'environ sept jours ; sessionStorage conserve le point de depart pendant la session ; Cache Storage conserve les ressources PWA."],
  ];
  return renderPageContainer(
    renderHeading('Politique de confidentialite', 'Les donnees traitees, leur utilite et les choix disponibles sur Aix en trott.'),
    `<section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Responsable du traitement</h2><p class="mt-3 text-sm leading-6 text-slate-600">${escapeHtml(LEGAL_PUBLISHER.name)}, ${escapeHtml(LEGAL_PUBLISHER.status)}, ${LEGAL_PUBLISHER.addressLines.map(escapeHtml).join(', ')}. Pour exercer vos droits : <a href="mailto:${escapeHtml(LEGAL_PUBLISHER.email)}" class="font-semibold text-sky">${escapeHtml(LEGAL_PUBLISHER.email)}</a>. Aucun DPO n'est designe.</p></section>
    <section class="mt-4 grid gap-4 lg:grid-cols-2">${treatments.map(([title, text]) => `<article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">${escapeHtml(title)}</h2><p class="mt-3 text-sm leading-6 text-slate-600">${escapeHtml(text)}</p></article>`).join('')}</section>
    <section class="mt-4 grid gap-4 lg:grid-cols-2"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">E-mails et conservation</h2><p class="mt-3 text-sm leading-6 text-slate-600">Les e-mails volontaires sont utilises pour repondre ou traiter un signalement et conserves 12 mois maximum apres le dernier echange utile, sauf obligation legale contraire.</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Destinataires</h2><p class="mt-3 text-sm leading-6 text-slate-600">Google, Vercel et le service de messagerie utilise peuvent traiter les donnees necessaires a leur service.</p></article></section>
    <section class="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-xl font-semibold text-slate-950">Vos droits</h2><p class="mt-3 text-sm leading-6 text-slate-600">Selon le traitement, vous pouvez demander l'acces, la rectification, l'effacement, la limitation, vous opposer ou retirer votre consentement. Vous pouvez aussi saisir la <a href="https://www.cnil.fr/fr/plaintes" class="font-semibold text-sky">CNIL</a>.</p><a href="/contact" class="mt-4 inline-flex font-semibold text-sky">Nous contacter</a></section>`,
  );
}

function buildGuideDetailStaticContent(guide) {
  const relatedSpots = guide.relatedSpotIds.map((id) => spotById.get(id)).filter(Boolean);
  const relatedGuides = guide.relatedGuideSlugs.map((slug) => guideBySlug.get(slug)).filter(Boolean);
  return renderPageContainer(
    renderHeading(guide.title, guide.intro, 'Guide local'),
    `<article class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">${guide.sections
      .map(
        (section) => `<section class="mt-6 first:mt-0"><h2 class="text-2xl font-semibold text-slate-950">${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p class="mt-3 text-base leading-7 text-slate-600">${escapeHtml(paragraph)}</p>`).join('')}</section>`,
      )
      .join('')}</article>
    <section class="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Questions frequentes</h2>${guide.faq.map((item) => `<article class="mt-5"><h3 class="font-semibold text-slate-950">${escapeHtml(item.question)}</h3><p class="mt-2 text-sm leading-6 text-slate-600">${escapeHtml(item.answer)}</p></article>`).join('')}</section>
    <section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Preparer cette sortie</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${guide.ctas.map((cta) => `<a href="${escapeHtml(cta.to)}" class="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft"><strong class="text-slate-950">${escapeHtml(cta.label)}</strong><span class="mt-2 block text-sm leading-6 text-slate-600">${escapeHtml(cta.description)}</span></a>`).join('')}</div></section>
    ${relatedSpots.length ? `<section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Sorties liees</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${relatedSpots.map(renderSpotCard).join('')}</div></section>` : ''}
    ${relatedGuides.length ? `<section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Guides lies</h2><div class="mt-4 grid gap-4 md:grid-cols-2">${relatedGuides.map(renderGuideCard).join('')}</div></section>` : ''}`,
  );
}

function buildSpotDetailStaticContent(spot) {
  const relatedSpots = uniqueSpots
    .filter(
      (item) =>
        item.id !== spot.id &&
        (item.area === spot.area || item.routeType === spot.routeType || item.moods.some((mood) => spot.moods.includes(mood))),
    )
    .slice(0, 4);
  const relatedGuides = editorialGuides.filter((guide) => guide.relatedSpotIds.includes(spot.id)).slice(0, 3);
  return renderPageContainer(
    renderHeading(spot.name, spot.description, 'Fiche sortie'),
    `<section class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4"><article class="rounded-[1.5rem] bg-white p-5 shadow-soft"><h2 class="text-sm font-semibold text-slate-500">Distance aller indicative</h2><p class="mt-2 text-xl font-semibold text-slate-950">${escapeHtml(spot.distanceKmFromAix)} km</p></article><article class="rounded-[1.5rem] bg-white p-5 shadow-soft"><h2 class="text-sm font-semibold text-slate-500">Duree</h2><p class="mt-2 text-xl font-semibold text-slate-950">${escapeHtml(spot.duration)}</p></article><article class="rounded-[1.5rem] bg-white p-5 shadow-soft"><h2 class="text-sm font-semibold text-slate-500">Budget</h2><p class="mt-2 text-xl font-semibold text-slate-950">${escapeHtml(spot.budget)}</p></article><article class="rounded-[1.5rem] bg-white p-5 shadow-soft"><h2 class="text-sm font-semibold text-slate-500">Recharge</h2><p class="mt-2 text-xl font-semibold text-slate-950">${escapeHtml(getRechargeLabel(spot.rechargeStatus))}</p></article></section>
    <section class="mt-6 grid gap-4 lg:grid-cols-2"><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Itineraire et securite</h2><p class="mt-4 text-sm leading-6 text-slate-600"><strong>Adresse :</strong> ${escapeHtml(spot.address)}</p><p class="mt-3 text-sm leading-6 text-slate-600"><strong>Trajet :</strong> ${escapeHtml(spot.routeNotes)}</p><p class="mt-3 text-sm leading-6 text-slate-600"><strong>Pistes cyclables :</strong> ${escapeHtml(spot.cyclingInfrastructure.label)}. ${escapeHtml(spot.cyclingInfrastructure.notes)}</p><p class="mt-3 text-sm leading-6 text-slate-600"><strong>Vigilance :</strong> ${escapeHtml(spot.roadSafety.notes)}</p></article><article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"><h2 class="text-2xl font-semibold text-slate-950">Conseils pratiques</h2><p class="mt-4 text-sm leading-6 text-slate-600"><strong>Meilleur moment :</strong> ${escapeHtml(spot.bestTime)}</p><p class="mt-3 text-sm leading-6 text-slate-600"><strong>Stationnement :</strong> ${escapeHtml(spot.parkingAdvice)}</p><ul class="mt-4 space-y-2 text-sm leading-6 text-slate-600">${spot.tips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul><p class="mt-4 text-sm font-semibold text-amber-800">Distance indicative, pistes cyclables et recharge a verifier avant depart.</p></article></section>
    ${relatedSpots.length ? `<section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Autres sorties a comparer</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">${relatedSpots.map(renderSpotCard).join('')}</div></section>` : ''}
    ${relatedGuides.length ? `<section class="mt-8"><h2 class="text-2xl font-semibold text-slate-950">Guides associes</h2><div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">${relatedGuides.map(renderGuideCard).join('')}</div></section>` : ''}`,
  );
}

function buildStaticContentForRoute(routePath) {
  const staticPages = {
    '/': buildHomeStaticContent,
    '/planner': buildPlannerStaticContent,
    '/sorties': buildSortiesStaticContent,
    '/carte': buildCarteStaticContent,
    '/recharge': buildRechargeStaticContent,
    '/conseils': buildConseilsStaticContent,
    '/guides': buildGuidesStaticContent,
    '/a-propos': buildAboutStaticContent,
    '/contact': buildContactStaticContent,
    '/mentions-legales': buildLegalNoticeStaticContent,
    '/confidentialite': buildPrivacyStaticContent,
  };
  const staticPage = staticPages[routePath];
  if (staticPage) {
    return staticPage();
  }

  if (routePath.startsWith('/sorties/')) {
    const spot = spotById.get(routePath.slice('/sorties/'.length));
    if (spot) {
      return buildSpotDetailStaticContent(spot);
    }
  }

  if (routePath.startsWith('/guides/')) {
    const guide = guideBySlug.get(routePath.slice('/guides/'.length));
    if (guide) {
      return buildGuideDetailStaticContent(guide);
    }
  }

  throw new Error(`No static content builder configured for ${routePath}.`);
}

function injectStaticContent(template, routePath, content) {
  const rootPattern = /<div id="root"><\/div>/i;
  if (!rootPattern.test(template)) {
    throw new Error(`Empty React root not found while generating ${routePath}.`);
  }

  return template.replace(rootPattern, `<div id="root">${renderStaticShell(routePath, content)}</div>`);
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
  const collectionItems = uniqueSpots.map((spot) => ({
    name: spot.name,
    path: `/sorties/${spot.id}`,
  }));
  const guideItems = editorialGuides.map((guide) => ({
    name: guide.shortTitle,
    path: getEditorialGuidePath(guide.slug),
  }));

  return [
    {
      path: '/',
      seo: buildPageSeo({
        title: "Aix en trott : sorties en trottinette autour d'Aix-en-Provence",
        description:
          "Preparez vos sorties en trottinette electrique autour d'Aix-en-Provence avec un catalogue local, une carte, la recharge et des conseils pratiques.",
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/',
            title: "Aix en trott : sorties en trottinette autour d'Aix-en-Provence",
            description:
              "Preparez vos sorties en trottinette electrique autour d'Aix-en-Provence avec un catalogue local, une carte, la recharge et des conseils pratiques.",
          }),
          buildHowToNode('/', 'Comment preparer une sortie en trottinette autour d Aix-en-Provence', [
            { name: 'Choisir ton temps disponible', text: 'Repere si tu veux une sortie rapide, du soir, week-end ou une journee.', path: '/sorties' },
            { name: 'Filtrer par distance ou ambiance', text: 'Utilise le catalogue pour trier les sorties par distance, ambiance ou recharge.', path: '/sorties' },
            { name: 'Verifier autonomie et recharge', text: 'Controle ton autonomie indicative et les points de recharge avant depart.', path: '/planner' },
            { name: 'Partir equipe', text: 'Pars avec batterie pleine, eau, casque et antivol.', path: '/conseils' },
          ]),
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
          buildFaqPageNode('/recharge', [
            {
              question: 'Une borne voiture suffit-elle pour charger une trottinette ?',
              answer: "Non. Il faut verifier la presence d une prise 220V ou Schuko avant de compter dessus.",
            },
            {
              question: 'Une recharge indiquee comme possible est-elle fiable ?',
              answer: "Elle reste a confirmer avant depart. Ce n est pas une garantie d usage.",
            },
            {
              question: 'Quel est le bon reflexe avant une longue sortie ?',
              answer: "Croiser recharge, autonomie et solution de retour au lieu de compter sur une seule borne.",
            },
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
      path: '/guides',
      seo: buildPageSeo({
        title: "Guides trottinette autour d'Aix-en-Provence",
        description:
          "Guides pratiques pour preparer une sortie trottinette autour d'Aix-en-Provence : Cassis, recharge, Sainte-Victoire, Cote Bleue, Luberon et sorties proches.",
        path: '/guides',
        jsonLd: buildCollectionSeoGraph({
          path: '/guides',
          title: "Guides trottinette autour d'Aix-en-Provence",
          description:
            "Guides pratiques pour preparer une sortie trottinette autour d'Aix-en-Provence : Cassis, recharge, Sainte-Victoire, Cote Bleue, Luberon et sorties proches.",
          items: guideItems,
        }),
      }),
    },
    {
      path: '/a-propos',
      seo: buildPageSeo({
        title: 'A propos',
        description:
          "Decouvrez la mission, la methode editoriale et les limites des distances, itineraires, estimations batterie et recharges d'Aix en trott.",
        path: '/a-propos',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/a-propos',
            title: 'A propos',
            description:
              "Decouvrez la mission, la methode editoriale et les limites des distances, itineraires, estimations batterie et recharges d'Aix en trott.",
            pageType: 'AboutPage',
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'A propos', path: '/a-propos' },
          ]),
        ]),
      }),
    },
    {
      path: '/contact',
      seo: buildPageSeo({
        title: 'Contact',
        description:
          "Contactez Aix en trott pour signaler une information, suggerer une sortie ou poser une question sur le site.",
        path: '/contact',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/contact',
            title: 'Contact',
            description:
              "Contactez Aix en trott pour signaler une information, suggerer une sortie ou poser une question sur le site.",
            pageType: 'ContactPage',
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]),
      }),
    },
    {
      path: '/mentions-legales',
      seo: buildPageSeo({
        title: 'Mentions legales',
        description:
          "Consultez les informations legales de l'editeur et de l'hebergeur du site Aix en trott.",
        path: '/mentions-legales',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/mentions-legales',
            title: 'Mentions legales',
            description:
              "Consultez les informations legales de l'editeur et de l'hebergeur du site Aix en trott.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Mentions legales', path: '/mentions-legales' },
          ]),
        ]),
      }),
    },
    {
      path: '/confidentialite',
      seo: buildPageSeo({
        title: 'Politique de confidentialite',
        description:
          "Politique de confidentialite d'Aix en trott : mesure d'audience, publicite, cartographie, stockages locaux et droits.",
        path: '/confidentialite',
        jsonLd: buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/confidentialite',
            title: 'Politique de confidentialite',
            description:
              "Politique de confidentialite d'Aix en trott : mesure d'audience, publicite, cartographie, stockages locaux et droits.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Politique de confidentialite', path: '/confidentialite' },
          ]),
        ]),
      }),
    },
    ...uniqueSpots.map((spot) => ({
      path: `/sorties/${spot.id}`,
      seo: buildPageSeo({
        title: `${spot.name} - sortie trottinette autour d'Aix`,
        description: buildSpotSeoDescription(spot),
        type: 'article',
        path: `/sorties/${spot.id}`,
        jsonLd: buildSpotSeoGraph(spot),
      }),
    })),
    ...editorialGuides.map((guide) => ({
      path: getEditorialGuidePath(guide.slug),
      seo: buildPageSeo({
        title: guide.title,
        description: guide.description,
        path: getEditorialGuidePath(guide.slug),
        jsonLd: buildGuideSeoGraph(guide),
      }),
    })),
  ];
}

async function main() {
  const template = await readFile(distIndexPath, 'utf8');
  const routes = buildRouteConfigs();
  const uniqueRouteCount = new Set(routes.map((route) => route.path)).size;

  if (uniqueRouteCount !== routes.length) {
    throw new Error(`Duplicate static routes detected: ${routes.length - uniqueRouteCount}.`);
  }

  for (const route of routes) {
    const staticContent = buildStaticContentForRoute(route.path);
    const routeHtml = injectStaticContent(applySeo(template, route.seo), route.path, staticContent);
    const h1Count = (routeHtml.match(/<h1\b/gi) ?? []).length;

    if (h1Count !== 1) {
      throw new Error(`Expected one H1 in ${route.path}, found ${h1Count}.`);
    }
    const targetPath =
      route.path === '/'
        ? distIndexPath
        : path.join(distDir, route.path.replace(/^\//, ''), 'index.html');

    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, routeHtml, 'utf8');
  }

  console.log(`Generated static SEO HTML with initial content for ${routes.length} routes.`);
  console.log(`Root canonical: ${buildSiteUrl('/')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
