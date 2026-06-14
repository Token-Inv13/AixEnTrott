import { SectionTitle } from '../components/Badges';
import { ChargingPointCard } from '../components/ChargingPointCard';
import { chargingPoints } from '../data/chargingPoints';

export function RechargePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Cette page sépare clairement les prises 220V réellement utiles pour trottinette des bornes voiture et des solutions privées.">
        Recharge
      </SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-950">Statuts clairs</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li><strong>confirmed-220v</strong> : compatible trottinette confirmée.</li>
            <li><strong>possible-220v</strong> : prise 220V possible mais à vérifier.</li>
            <li><strong>car-only</strong> : borne voiture uniquement, non adaptée directement.</li>
            <li><strong>private</strong> : accès privé ou sur abonnement.</li>
            <li><strong>verify</strong> : à vérifier avant départ.</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-slate-700">
            Ne confonds pas borne voiture et compatibilité trottinette: une prise type 2 seule ne suffit pas.
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
            <li>Prévoyez 3 heures ou plus pour une vraie recharge.</li>
            <li>Si la borne est en parking voiture, vérifie l’accès réel avant d’y compter.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

