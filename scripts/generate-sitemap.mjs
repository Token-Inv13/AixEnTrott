import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { editorialGuides, getEditorialGuidePath } from '../src/data/editorialPages.ts';
import { buildSiteUrl } from '../src/config/site.ts';
import { spots } from '../src/data/spots.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicSitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');

const staticRoutes = ['/', '/planner', '/sorties', '/carte', '/recharge', '/conseils', '/guides', '/a-propos'];

function buildUrlEntry(route) {
  return `  <url><loc>${buildSiteUrl(route)}</loc></url>`;
}

async function main() {
  const guideRoutes = editorialGuides.map((guide) => getEditorialGuidePath(guide.slug));
  const spotRoutes = [...new Set(spots.map((spot) => `/sorties/${spot.id}`))];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticRoutes.map(buildUrlEntry),
    ...guideRoutes.map(buildUrlEntry),
    ...spotRoutes.map(buildUrlEntry),
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(publicSitemapPath, xml, 'utf8');
  console.log(`Sitemap generated with ${staticRoutes.length + guideRoutes.length + spotRoutes.length} URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
