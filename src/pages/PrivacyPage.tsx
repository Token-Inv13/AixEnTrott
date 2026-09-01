import { Link } from 'react-router-dom';
import { PageSeo } from '../components/PageSeo';
import { SectionKicker, SectionTitle } from '../components/Badges';
import { LEGAL_PUBLISHER } from '../data/institutional';
import { openPrivacySettings } from '../lib/analytics';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

const description =
  "Politique de confidentialite d'Aix en trott : mesure d'audience, publicite, cartographie, stockages locaux et droits.";

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Politique de confidentialite"
        description={description}
        path="/confidentialite"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/confidentialite',
            title: 'Politique de confidentialite',
            description,
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Politique de confidentialite', path: '/confidentialite' },
          ]),
        ])}
      />
      <SectionTitle description="Les donnees traitees, leur utilite et les choix disponibles sur Aix en trott.">
        Politique de confidentialite
      </SectionTitle>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <SectionKicker>Responsable du traitement</SectionKicker>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{LEGAL_PUBLISHER.name}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {LEGAL_PUBLISHER.status}, {LEGAL_PUBLISHER.addressLines.join(', ')}. Les demandes relatives aux donnees personnelles peuvent etre adressees a{' '}
          <a className="break-all font-semibold text-sky" href={`mailto:${LEGAL_PUBLISHER.email}`}>
            {LEGAL_PUBLISHER.email}
          </a>. Aucun delegue a la protection des donnees n'est designe.
        </p>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Mesure d'audience avec Google Analytics 4</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Google Analytics 4 (identifiant G-7CQKVX43X0) sert a mesurer l'audience et a ameliorer le site. Il n'est pas charge avant votre consentement Analytics. Vous pouvez accepter, refuser puis retirer votre accord depuis les parametres de confidentialite.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Base legale : votre consentement.</p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Publicite Google AdSense</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Google AdSense (editeur pub-5209828957209966) peut diffuser des annonces. Le CMP Google Funding Choices recueille et gere les preferences publicitaires lorsque la reglementation l'exige.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Base legale : consentement lorsque requis et choix enregistres dans le CMP Google.</p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Cartographie, lieux et itineraires</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Google Maps, Places et Routes sont utilises pour afficher la carte, rechercher un lieu et calculer un trajet. Lorsque vous lancez ces fonctions, les coordonnees de depart et de destination necessaires peuvent etre transmises a Google.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Base legale : execution de la fonctionnalite demandee volontairement par l'utilisateur.</p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Geolocalisation</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Votre position precise est demandee uniquement lorsque vous choisissez de vous localiser. La permission reste controlee par votre navigateur et peut y etre retiree.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Base legale : execution de votre demande.</p>
        </section>
      </div>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-950">Stockages utilises sur votre appareil</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-slate-50 p-4"><h3 className="font-semibold text-slate-950">localStorage</h3><p className="mt-2 text-sm leading-6 text-slate-600">Conserve votre choix Analytics et un cache de certaines distances, avec une duree logique d'environ sept jours.</p></article>
          <article className="rounded-2xl bg-slate-50 p-4"><h3 className="font-semibold text-slate-950">sessionStorage</h3><p className="mt-2 text-sm leading-6 text-slate-600">Conserve le point de depart et ses coordonnees utiles pendant la session.</p></article>
          <article className="rounded-2xl bg-slate-50 p-4"><h3 className="font-semibold text-slate-950">Cache Storage</h3><p className="mt-2 text-sm leading-6 text-slate-600">Met en cache les ressources techniques de la PWA pour les performances et le fonctionnement hors ligne.</p></article>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">Ces stockages techniques reposent sur le fonctionnement du service et l'interet legitime a maintenir une experience fiable.</p>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">E-mails et signalements</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Un message envoye volontairement peut contenir votre adresse e-mail, son contenu et les informations que vous transmettez. Il est utilise pour vous repondre ou traiter le signalement.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">Conservation : 12 mois maximum apres le dernier echange utile, sauf obligation legale contraire. Base legale : traitement de votre demande et interet legitime a assurer son suivi.</p>
        </section>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-950">Destinataires et prestataires</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Selon les fonctions utilisees, les donnees peuvent etre traitees par Google, par Vercel pour l'hebergement et par le service de messagerie utilise pour recevoir les e-mails. Certains traitements peuvent avoir lieu hors de l'Espace economique europeen selon les garanties decrites par ces prestataires.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <a className="text-sky" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Confidentialite Google</a>
            <a className="text-sky" href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Confidentialite Vercel</a>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-950">Vos droits</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Selon le traitement et les conditions applicables, vous pouvez demander l'acces, la rectification, l'effacement, la limitation ou vous opposer au traitement. Vous pouvez retirer un consentement a tout moment, sans remettre en cause les traitements anterieurs a ce retrait.</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">Ecrivez a <a className="break-all font-semibold text-sky" href={`mailto:${LEGAL_PUBLISHER.email}`}>{LEGAL_PUBLISHER.email}</a>. Vous pouvez aussi introduire une reclamation aupres de la <a className="font-semibold text-sky" href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noreferrer">CNIL</a>.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={openPrivacySettings} className="rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">Parametres de confidentialite</button>
          <Link to="/contact" className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-300 transition hover:bg-slate-50">Nous contacter</Link>
        </div>
      </section>
    </div>
  );
}
