import { Link } from 'react-router-dom';
import { AdSlot } from '../components/AdSlot';
import { PageSeo } from '../components/PageSeo';
import { SectionTitle } from '../components/Badges';
import { ADSENSE_SLOTS } from '../config/ads';
import { ChargingPointCard } from '../components/ChargingPointCard';
import { buildReportIssueMailto } from '../config/site';
import { chargingPoints } from '../data/chargingPoints';
import { editorialGuides, getEditorialGuidePath } from '../data/editorialPages';
import { buildBreadcrumbNode, buildFaqPageNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

export function RechargePage() {
  const reportMailto = buildReportIssueMailto('Recharge', 'https://aixentrott.fr/recharge');
  const guideLinks = editorialGuides.filter((guide) =>
    ['recharge-trottinette-aix', 'sortie-trottinette-cassis', 'sortie-trottinette-la-ciotat'].includes(guide.slug),
  );
  const faqItems = [
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
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Recharge trottinette autour d'Aix-en-Provence"
        description="Reperez des solutions de recharge trottinette autour d'Aix-en-Provence : prise 220V confirmee, borne voiture, acces prive et points a verifier."
        path="/recharge"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/recharge',
            title: "Recharge trottinette autour d'Aix-en-Provence",
            description:
              "Reperez des solutions de recharge trottinette autour d'Aix-en-Provence : prise 220V confirmee, borne voiture, acces prive et points a verifier.",
          }),
          buildBreadcrumbNode([
            { name: 'Accueil', path: '/' },
            { name: 'Recharge', path: '/recharge' },
          ]),
          buildFaqPageNode('/recharge', faqItems),
        ])}
      />
      <SectionTitle description="Les points listes distinguent clairement 220V, borne voiture, acces prive et points a verifier.">
        Recharge
      </SectionTitle>

      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={reportMailto}
          className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
        >
          Signaler une erreur
        </a>
      </div>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Statuts clairs</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              <strong>Compatible 220V confirmee</strong> : prise annoncee comme compatible trottinette.
            </li>
            <li>
              <strong>Prise 220V possible, a verifier</strong> : a confirmer sur place.
            </li>
            <li>
              <strong>Borne voiture uniquement</strong> : ne pas compter dessus sans prise 220V ou Schuko confirmee.
            </li>
            <li>
              <strong>Acces prive / abonnement</strong> : solution reservee ou payante.
            </li>
            <li>
              <strong>A verifier avant depart</strong> : ne rien supposer sans confirmation.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Chargemap, PlugShare et Google Maps recensent surtout des bornes voiture. Pour une trottinette, verifie la
            prise 220V ou Schuko et emporte ton chargeur.
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {chargingPoints.map((point) => (
            <ChargingPointCard key={point.id} point={point} />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Applications utiles</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              {
                name: 'Chargemap',
                text: 'Pratique pour reperer une prise, mais la compatibilite reste a confirmer.',
              },
              {
                name: 'PlugShare',
                text: 'Utile pour croiser disponibilite et type de prise.',
              },
              {
                name: 'Google Maps',
                text: 'Utile pour trouver le lieu, pas pour garantir le branchement.',
              },
            ].map((app) => (
              <div key={app.name} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-950">{app.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{app.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Bon reflexe avant depart</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <li>Emporte toujours ton chargeur.</li>
            <li>Reste a proximite de la trottinette pendant la recharge.</li>
            <li>Prevois plusieurs heures pour une vraie recharge.</li>
            <li>Si la borne est sur un parking voiture, verifie l'acces reel.</li>
          </ul>
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Guides lies a la recharge</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Pratique pour relier le sujet recharge a une vraie destination ou a une sortie longue.</p>
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

      <AdSlot
        className="mt-6"
        slotId={ADSENSE_SLOTS.rechargeBanner}
        label="Banniere recharge"
      />
    </div>
  );
}
