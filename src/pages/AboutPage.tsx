import { Link } from 'react-router-dom';
import { SectionKicker, SectionTitle } from '../components/Badges';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Une page de contexte pour rappeler ce que le site fait, ce qu’il ne garantit pas et ce qu’il faut vérifier avant de partir.">
        À propos
      </SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Objectif</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Aider à choisir une sortie réaliste</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Trott-out-Aix aide à comparer des sorties en trottinette électrique autour d’Aix-en-Provence avec une
            lecture simple des distances, de l’autonomie, de la recharge et du niveau de préparation.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Les distances sont indicatives, les coordonnées et les pistes cyclables doivent être vérifiées, et les
            informations de recharge peuvent changer.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Tu restes responsable de ton trajet, de ton équipement et de ta sécurité. Le site sert d’aide à la
            décision, pas de garantie.
          </p>
          <div className="mt-6">
            <Link to="/conseils" className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
              Lire les conseils
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Sources & limites</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Ce qu’il faut garder en tête</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Données construites à partir de recherches locales, cartes publiques et vérifications manuelles.</li>
            <li>Les informations ne remplacent pas une vérification sur place.</li>
            <li>Les itinéraires Google Maps vélo restent indicatifs.</li>
            <li>Les bornes voiture ne sont pas automatiquement compatibles avec une trottinette.</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Si un point de sortie ou de recharge te semble faux, utilise le bouton de signalement dans la fiche ou la
            page recharge.
          </div>
        </div>
      </section>
    </div>
  );
}
