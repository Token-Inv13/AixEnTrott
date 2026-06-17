import { Link } from 'react-router-dom';
import { SectionKicker, SectionTitle } from '../components/Badges';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionTitle description="Ce que le site aide a preparer, et ce qu'il faut toujours verifier avant de partir.">
        A propos
      </SectionTitle>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Objectif</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Aider a choisir une sortie realiste</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">Aix en trott aide a comparer des sorties autour d'Aix avec une lecture simple de la distance, de l'autonomie et de la recharge.</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Distances indicatives, coordonnees a verifier, pistes cyclables a confirmer, recharge susceptible d'evoluer.</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">Le site aide a decider. Le trajet, l'equipement et la securite restent de ta responsabilite.</p>
          <div className="mt-6">
            <Link to="/conseils" className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky">
              Lire les conseils
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Sources & limites</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">A garder en tete</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>Donnees issues de recherches locales, cartes publiques et verifications manuelles.</li>
            <li>Une verification sur place reste necessaire.</li>
            <li>Les itineraires velo restent indicatifs.</li>
            <li>Une borne voiture n'est pas automatiquement compatible.</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Un point faux ou date ? Utilise le signalement depuis une fiche ou la page recharge.
          </div>
        </div>
      </section>
    </div>
  );
}
