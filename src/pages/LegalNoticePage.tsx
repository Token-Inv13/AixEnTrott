import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { SectionKicker, SectionTitle } from '../components/Badges';
import { LEGAL_PUBLISHER, TECHNICAL_HOST } from '../data/institutional';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

const description =
  "Consultez les informations legales de l'editeur et de l'hebergeur du site Aix en trott.";

export function LegalNoticePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Mentions legales"
        description={description}
        path="/mentions-legales"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/mentions-legales',
            title: 'Mentions legales',
            description,
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Mentions legales', path: '/mentions-legales' },
          ]),
        ])}
      />

      <SectionTitle description="Identite de l'editeur, hebergement et cadre d'utilisation du site.">
        Mentions legales
      </SectionTitle>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Editeur</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Aix en trott</h2>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <p>{LEGAL_PUBLISHER.name}</p>
            <p>{LEGAL_PUBLISHER.status}</p>
            <address className="not-italic">
              {LEGAL_PUBLISHER.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p>SIREN : {LEGAL_PUBLISHER.siren}</p>
            <p>
              Telephone :{' '}
              <a className="font-semibold text-sky" href={`tel:${LEGAL_PUBLISHER.phoneHref}`}>
                {LEGAL_PUBLISHER.phoneDisplay}
              </a>
            </p>
            <p>
              E-mail :{' '}
              <a className="break-all font-semibold text-sky" href={`mailto:${LEGAL_PUBLISHER.email}`}>
                {LEGAL_PUBLISHER.email}
              </a>
            </p>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Directeur de la publication : {LEGAL_PUBLISHER.publicationDirector}.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Hebergement</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Hebergeur technique</h2>
          <div className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <p>{TECHNICAL_HOST.name}</p>
            <address className="not-italic">
              {TECHNICAL_HOST.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
            <p>
              Contact confidentialite :{' '}
              <a className="break-all font-semibold text-sky" href={`mailto:${TECHNICAL_HOST.privacyEmail}`}>
                {TECHNICAL_HOST.privacyEmail}
              </a>
            </p>
            <p>Numero officiellement publie pour l'agent DMCA : {TECHNICAL_HOST.dmcaPhoneDisplay}.</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
            <a className="text-sky" href={TECHNICAL_HOST.privacyNoticeUrl} target="_blank" rel="noreferrer">
              Politique Vercel
            </a>
            <a className="text-sky" href={TECHNICAL_HOST.dmcaPolicyUrl} target="_blank" rel="noreferrer">
              Coordonnees officielles
            </a>
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Propriete intellectuelle</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Les textes, la structure, l'identite visuelle et les contenus propres a Aix en trott sont proteges par le droit applicable. Les marques, cartes et contenus tiers restent la propriete de leurs titulaires.
          </p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Informations et responsabilite</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Distances, autonomie, recharge, circulation, itineraires et conditions locales sont indicatifs et peuvent evoluer. Verifiez le trajet, les restrictions locales, la meteo et l'etat du materiel avant de partir.
          </p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Liens externes</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Le site peut renvoyer vers des services cartographiques ou des sites tiers. Leur contenu, leur disponibilite et leurs pratiques relevent de leurs editeurs respectifs.
          </p>
        </section>
      </div>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-950">Contact</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Pour toute question concernant le site, utilisez la page de contact ou ecrivez a{' '}
          <a className="break-all font-semibold text-sky" href={`mailto:${LEGAL_PUBLISHER.email}`}>
            {LEGAL_PUBLISHER.email}
          </a>.
        </p>
        <Link to="/contact" className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
          Ouvrir la page contact
        </Link>
      </section>
    </div>
  );
}
