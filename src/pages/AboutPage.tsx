import { Link } from 'react-router-dom';
import { SectionKicker, SectionTitle } from '../components/Badges';
import { PageSeo } from '../components/PageSeo';
import { PwaInstallCard } from '../components/PwaInstallCard';
import { editorialGuides, getEditorialGuidePath } from '../data/editorialPages';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

export function AboutPage() {
  const guideLinks = editorialGuides.filter((guide) =>
    ['sortie-trottinette-aix-centre', 'recharge-trottinette-aix', 'balade-trottinette-sainte-victoire'].includes(guide.slug),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="A propos de Aix en trott"
        description="Comprenez l'objectif de Aix en trott, les limites des distances indicatives, la recharge a verifier et la logique du guide autour d'Aix-en-Provence."
        path="/a-propos"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/a-propos',
            title: 'A propos de Aix en trott',
            description:
              "Comprenez l'objectif de Aix en trott, les limites des distances indicatives, la recharge a verifier et la logique du guide autour d'Aix-en-Provence.",
            pageType: 'AboutPage',
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'A propos', path: '/a-propos' },
          ]),
        ])}
      />
      <SectionTitle description="Ce que le site aide a preparer, et ce qu'il faut toujours verifier avant de partir.">
        A propos
      </SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Objectif</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Aider a choisir une sortie realiste</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Aix en trott aide a comparer des sorties autour d'Aix avec une lecture simple de la distance, de l'autonomie et de la recharge.</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Distances indicatives, coordonnees a verifier, pistes cyclables a confirmer, recharge susceptible d'evoluer.</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Le site aide a decider. Le trajet, l'equipement et la securite restent de ta responsabilite.</p>
          <div className="mt-6">
            <Link to="/conseils" className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
              Lire les conseils
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Sources & limites</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">A garder en tete</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Donnees issues de recherches locales, cartes publiques et verifications manuelles.</li>
            <li>Une verification sur place reste necessaire.</li>
            <li>Les itineraires velo restent indicatifs.</li>
            <li>Une borne voiture n'est pas automatiquement compatible.</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Un point faux ou date ? Utilise le signalement depuis une fiche ou la page recharge.
          </div>
        </div>
      </section>

      <div className="mt-6">
        <PwaInstallCard className="max-w-3xl" />
      </div>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionKicker>Guides</SectionKicker>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Exemples concrets de lecture du site</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Si tu veux voir comment ces limites s appliquent en pratique, ouvre une page ciblee puis reviens sur le planner ou le catalogue.
            </p>
          </div>
          <Link to="/guides" className="text-sm font-semibold text-sky">
            Tous les guides
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {guideLinks.map((guide) => (
            <Link
              key={guide.slug}
              to={getEditorialGuidePath(guide.slug)}
              className="rounded-[1.5rem] bg-slate-50 p-4 transition hover:bg-sky-50/60"
            >
              <p className="font-semibold text-slate-950">{guide.shortTitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
