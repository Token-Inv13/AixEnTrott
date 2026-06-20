import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { Pill, SectionKicker, SectionTitle } from '../components/Badges';
import { buildCollectionSeoGraph } from '../lib/seo';
import { editorialGuides, getEditorialGuidePath } from '../data/editorialPages';

export function GuideHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Guides trottinette autour d'Aix-en-Provence"
        description="Guides pratiques pour preparer une sortie trottinette autour d'Aix-en-Provence : Cassis, recharge, Sainte-Victoire, Cote Bleue, Luberon et sorties proches."
        path="/guides"
        jsonLd={buildCollectionSeoGraph({
          path: '/guides',
          title: "Guides trottinette autour d'Aix-en-Provence",
          description:
            "Guides pratiques pour preparer une sortie trottinette autour d'Aix-en-Provence : Cassis, recharge, Sainte-Victoire, Cote Bleue, Luberon et sorties proches.",
          items: editorialGuides.map((guide) => ({
            name: guide.shortTitle,
            path: getEditorialGuidePath(guide.slug),
          })),
        })}
      />

      <SectionKicker>Guides locaux</SectionKicker>
      <SectionTitle description="Pages edito ciblees pour aller plus vite sur les questions les plus frequentes.">
        Guides pour preparer une sortie trottinette autour d'Aix
      </SectionTitle>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          Ces pages servent a repondre aux recherches tres concretes : sortie vers Cassis, recharge a Aix, balade autour de
          Sainte-Victoire, destinations mer ou longues sorties a preparer.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Pill>sortie longue</Pill>
          <Pill>recharge</Pill>
          <Pill>autonomie</Pill>
          <Pill>retour alternatif</Pill>
          <Pill>balade locale</Pill>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {editorialGuides.map((guide) => (
          <article
            key={guide.slug}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"
            style={{ contentVisibility: 'auto', containIntrinsicSize: '0 340px' }}
          >
            <p className="text-sm font-semibold text-sky">{guide.shortTitle}</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">{guide.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{guide.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {guide.relatedSpotIds.slice(0, 3).map((spotId) => (
                <Pill key={spotId}>{spotId.split('-').join(' ')}</Pill>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={getEditorialGuidePath(guide.slug)}
                className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky"
              >
                Lire le guide
              </Link>
              <Link to="/planner" className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Ouvrir le planner
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
