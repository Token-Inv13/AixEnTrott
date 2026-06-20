import { Link, Navigate, useParams } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { Pill, SectionKicker } from '../components/Badges';
import { findEditorialGuide, editorialGuides, getEditorialGuidePath } from '../data/editorialPages';
import { spots } from '../data/spots';
import { buildBreadcrumbNode, buildSeoGraph, buildWebsiteNodes, buildWebPageNode } from '../lib/seo';
import { formatRechargeStatus } from '../lib/spot-utils';

export function GuideDetailPage() {
  const { slug } = useParams();
  const guide = findEditorialGuide(slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const relatedSpots = guide.relatedSpotIds
    .map((spotId) => spots.find((spot) => spot.id === spotId))
    .filter((spot): spot is (typeof spots)[number] => Boolean(spot));
  const relatedGuides = guide.relatedGuideSlugs
    .map((relatedSlug) => editorialGuides.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof editorialGuides)[number] => Boolean(item));

  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `https://aixentrott.fr${getEditorialGuidePath(guide.slug)}#faq`,
    mainEntity: guide.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title={guide.title}
        description={guide.description}
        path={getEditorialGuidePath(guide.slug)}
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: getEditorialGuidePath(guide.slug),
            title: guide.title,
            description: guide.description,
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Guides', path: '/guides' },
            { name: guide.shortTitle, path: getEditorialGuidePath(guide.slug) },
          ]),
          faqSchema,
        ])}
      />

      <Link to="/guides" className="text-sm font-semibold text-sky">
        Retour aux guides
      </Link>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <SectionKicker>Guide local</SectionKicker>
        <h1 className="mt-2 max-w-4xl text-3xl font-semibold tracking-tight text-slate-950">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{guide.intro}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {guide.ctas.map((cta) => (
            <Link
              key={cta.label}
              to={cta.to}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-sky hover:bg-sky-50/60"
            >
              <p className="text-sm font-semibold text-slate-950">{cta.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{cta.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-4">
          {guide.sections.map((section) => (
            <article key={section.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-950">Questions utiles</h2>
            <div className="mt-4 space-y-3">
              {guide.faq.map((item) => (
                <article key={item.question} className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold text-slate-950">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-950">Fiches a ouvrir ensuite</h2>
            <div className="mt-4 space-y-3">
              {relatedSpots.map((spot) => (
                <Link
                  key={spot.id}
                  to={`/sorties/${spot.id}`}
                  className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-sky-50/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950">{spot.name}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {spot.distanceLabel} - {spot.duration}
                      </p>
                    </div>
                    <Pill tone={spot.rechargeStatus === 'confirmed' ? 'emerald' : spot.rechargeStatus === 'nearby' ? 'sky' : 'amber'}>
                      {formatRechargeStatus(spot.rechargeStatus)}
                    </Pill>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{spot.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {relatedGuides.length ? (
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-slate-950">Guides lies</h2>
              <div className="mt-4 space-y-3">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    to={getEditorialGuidePath(relatedGuide.slug)}
                    className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-sky-50/60"
                  >
                    <p className="font-semibold text-slate-950">{relatedGuide.shortTitle}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{relatedGuide.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-slate-950">Raccourcis utiles</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/guides" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky">
                Tous les guides
              </Link>
              <Link to="/sorties" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Catalogue sorties
              </Link>
              <Link to="/carte" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Carte
              </Link>
              <Link to="/planner" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Planner
              </Link>
              <Link to="/recharge" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Recharge
              </Link>
              <Link to="/conseils" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50">
                Conseils
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
