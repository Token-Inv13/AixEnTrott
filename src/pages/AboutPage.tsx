import { Link } from 'react-router-dom';
import { SectionKicker, SectionTitle } from '../components/Badges';
import { PageSeo } from '../components/PageSeo';
import { PwaInstallCard } from '../components/PwaInstallCard';
import { EDITORIAL_METHOD } from '../data/institutional';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

const description =
  "Decouvrez la mission, la methode editoriale et les limites des distances, itineraires, estimations batterie et recharges d'Aix en trott.";

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="A propos"
        description={description}
        path="/a-propos"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({ path: '/a-propos', title: 'A propos', description, pageType: 'AboutPage' }),
          buildBreadcrumbNode([{ name: 'Accueil', path: '/' }, { name: 'A propos', path: '/a-propos' }]),
        ])}
      />

      <SectionTitle description="La mission du site, sa methode et les points a verifier avant chaque sortie.">
        A propos
      </SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Le projet</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Un guide independant et pratique</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Aix en trott est un site independant consacre aux sorties et aux outils pratiques pour les deplacements et balades en trottinette autour d'Aix-en-Provence et dans les destinations proposees.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Son objectif est d'aider a comparer une destination, une autonomie et une solution de retour sans masquer les limites du trajet.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Methode editoriale</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Des informations utiles, avec leurs limites</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">{EDITORIAL_METHOD}</p>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-3">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Distances et itineraires</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Les valeurs initiales sont indicatives. Les outils cartographiques peuvent recalculer un trajet depuis votre point de depart, mais le resultat peut varier selon le service et les conditions locales.
          </p>
        </article>
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Batterie et autonomie</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Les estimations aident a decider, sans garantir l'autonomie reelle. Batterie, relief, vitesse, temperature, vent, charge et style de conduite modifient la consommation.
          </p>
        </article>
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Recharge</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Les prises, horaires et conditions d'acces peuvent evoluer. Verifiez la compatibilite locale avant de vous deplacer et ne supposez pas qu'une borne voiture convient a une trottinette.
          </p>
        </article>
      </section>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionKicker>Corrections</SectionKicker>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Une information a actualiser ?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Signalez une distance, un acces, une recharge ou une condition locale incorrecte afin que l'information puisse etre revue.
            </p>
          </div>
          <Link to="/contact" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
            Contacter Aix en trott
          </Link>
        </div>
      </section>

      <div className="mt-4">
        <PwaInstallCard className="max-w-3xl" />
      </div>
    </div>
  );
}
