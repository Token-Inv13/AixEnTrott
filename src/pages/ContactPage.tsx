import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { SectionKicker, SectionTitle } from '../components/Badges';
import { CONTACT_REASONS, LEGAL_PUBLISHER } from '../data/institutional';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

const description =
  "Contactez Aix en trott pour signaler une information, suggerer une sortie ou poser une question sur le site.";

export function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Contact"
        description={description}
        path="/contact"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({ path: '/contact', title: 'Contact', description, pageType: 'ContactPage' }),
          buildBreadcrumbNode([{ name: 'Accueil', path: '/' }, { name: 'Contact', path: '/contact' }]),
        ])}
      />
      <SectionTitle description="Un point de contact direct, sans formulaire ni compte utilisateur.">Contact</SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Aix en trott</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Nous joindre</h2>
          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
            <div><p className="font-semibold text-slate-950">E-mail</p><a className="break-all font-semibold text-sky" href={`mailto:${LEGAL_PUBLISHER.email}`}>{LEGAL_PUBLISHER.email}</a></div>
            <div><p className="font-semibold text-slate-950">Telephone</p><a className="font-semibold text-sky" href={`tel:${LEGAL_PUBLISHER.phoneHref}`}>{LEGAL_PUBLISHER.phoneDisplay}</a></div>
          </div>
          <a href={`mailto:${LEGAL_PUBLISHER.email}`} className="mt-6 inline-flex min-h-11 items-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">Envoyer un e-mail</a>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Votre demande</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Motifs de contact</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {CONTACT_REASONS.map((reason) => <li key={reason} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{reason}</li>)}
          </ul>
          <p className="mt-5 text-sm leading-6 text-slate-600">Aucun formulaire n'est utilise : votre messagerie ouvre directement un nouvel e-mail. Les messages sont conserves au maximum 12 mois apres le dernier echange utile, sauf obligation legale contraire.</p>
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-950">Informations utiles</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/a-propos" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300">A propos</Link>
          <Link to="/confidentialite" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300">Confidentialite</Link>
          <Link to="/mentions-legales" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300">Mentions legales</Link>
        </div>
      </section>
    </div>
  );
}
