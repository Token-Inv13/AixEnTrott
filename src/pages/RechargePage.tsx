import { SectionTitle } from '../components/Badges';
import { ChargingPointCard } from '../components/ChargingPointCard';
import { buildReportIssueMailto } from '../config/site';
import { chargingPoints } from '../data/chargingPoints';

export function RechargePage() {
  const reportMailto = buildReportIssueMailto('Recharge', 'https://aixentrott.fr/recharge');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Cette page sépare clairement les prises 220V réellement utiles pour trottinette des bornes voiture et des solutions privées.">
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
              <strong>Compatible 220V confirmée</strong> : la recharge trottinette est explicitement compatible.
            </li>
            <li>
              <strong>Prise 220V possible, à vérifier</strong> : présence probable, mais vérification sur place indispensable.
            </li>
            <li>
              <strong>Borne voiture uniquement</strong> : non compatible directement sans prise 220V ou Schuko confirmée.
            </li>
            <li>
              <strong>Accès privé / abonnement</strong> : solution non grand public ou sur abonnement.
            </li>
            <li>
              <strong>À vérifier avant départ</strong> : rien ne doit être supposé sans confirmation.
            </li>
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Chargemap, PlugShare et Google Maps recensent surtout des bornes pour véhicules électriques. Pour une
            trottinette, vérifiez toujours la présence d’une prise 220V ou Schuko et emportez votre chargeur.
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
                text: 'Très utile pour repérer une prise 220V, mais la compatibilité trottinette doit toujours être confirmée.',
              },
              {
                name: 'PlugShare',
                text: 'Pratique pour croiser disponibilité et type de prise en temps réel.',
              },
              {
                name: 'Google Maps',
                text: 'Utile pour repérer la borne, mais pas pour valider le branchement réel.',
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
          <h2 className="text-lg font-semibold text-slate-950">Bon réflexe avant départ</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
            <li>Emporte toujours ton chargeur.</li>
            <li>Reste à proximité de la trottinette pendant la recharge.</li>
            <li>Prévois 3 heures ou plus pour une vraie recharge.</li>
            <li>Si la borne est en parking voiture, vérifie l’accès réel avant d’y compter.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
