import { AdSlot } from '../components/AdSlot';
import { PageSeo } from '../components/PageSeo';
import { SectionTitle } from '../components/Badges';
import { ADSENSE_SLOTS } from '../config/ads';
import { ChargingPointCard } from '../components/ChargingPointCard';
import { buildReportIssueMailto } from '../config/site';
import { chargingPoints } from '../data/chargingPoints';
import { buildBreadcrumbNode, buildSeoGraph, buildWebPageNode, buildWebsiteNodes } from '../lib/seo';

export function RechargePage() {
  const reportMailto = buildReportIssueMailto('Recharge', 'https://aixentrott.fr/recharge');

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

      <AdSlot
        className="mt-6"
        slotId={ADSENSE_SLOTS.rechargeBanner}
        label="Banniere recharge"
      />
    </div>
  );
}
