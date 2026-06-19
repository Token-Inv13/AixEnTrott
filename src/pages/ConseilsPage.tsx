import { SectionTitle } from '../components/Badges';
import { PageSeo } from '../components/PageSeo';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

export function ConseilsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Conseils trottinette electrique autour d'Aix"
        description="Retrouvez les conseils pratiques pour preparer une sortie en trottinette electrique autour d'Aix : autonomie, recharge, securite et erreurs a eviter."
        path="/conseils"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/conseils',
            title: 'Conseils trottinette electrique autour d Aix',
            description:
              "Retrouvez les conseils pratiques pour preparer une sortie en trottinette electrique autour d'Aix : autonomie, recharge, securite et erreurs a eviter.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Conseils', path: '/conseils' },
          ]),
        ])}
      />
      <SectionTitle description="Les meilleures sorties sont souvent les plus simples a relire avant de partir.">
        Conseils
      </SectionTitle>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          "L'autonomie reelle baisse avec le vent, les cotes et le poids transporte.",
          'Pars avec la batterie pleine et emporte ton chargeur si la sortie depasse le simple aller-retour.',
          'Verifie la compatibilite 220V avant de compter sur une borne publique.',
          'Ne laisse pas la trottinette sans surveillance pendant une recharge ou une pause.',
          'Prevois antivol, eau, casque et eclairage.',
          'Verifie les fermetures de massifs en ete avant les sorties nature.',
          'Pour les sorties longues, train + trottinette reste souvent le plus simple.',
        ].map((item) => (
          <article key={item} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-base leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-950">A ne pas faire</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
          <li>Partir avec une batterie faible.</li>
          <li>Compter sur une borne voiture sans verifier la prise.</li>
          <li>Laisser la trottinette seule en recharge.</li>
          <li>Sous-estimer les cotes et le vent.</li>
          <li>Rouler dans les massifs fermes en ete.</li>
        </ul>
      </section>
    </div>
  );
}
