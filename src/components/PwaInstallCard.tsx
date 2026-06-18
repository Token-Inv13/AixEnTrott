import { useState } from 'react';
import { usePwaInstall } from '../hooks/use-pwa-install';

export function PwaInstallCard() {
  const { canInstall, isInstalled, isIos, promptInstall } = usePwaInstall();
  const [message, setMessage] = useState<string | null>(null);

  if (isInstalled) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold text-slate-950">Mode app</p>
        <p className="mt-3 text-sm leading-6 text-slate-600">Aix en trott est deja installee sur cet appareil.</p>
      </section>
    );
  }

  async function handleInstall() {
    const outcome = await promptInstall();
    if (outcome === 'dismissed') {
      setMessage("Installation annulee. Tu peux reessayer plus tard depuis cette page.");
    }
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold text-slate-950">Mode app</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Installer Aix en trott</h2>
      {canInstall ? (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">Ajoute le guide a l'ecran d'accueil pour ouvrir plus vite la carte, les sorties et la recharge.</p>
          <button
            type="button"
            onClick={handleInstall}
            className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
          >
            Installer l'app
          </button>
        </>
      ) : isIos ? (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sur iPhone ou iPad, ouvre le menu de partage puis choisis "Sur l'ecran d'accueil".</p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Etapes : Safari → Partager → Sur l'ecran d'accueil.
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">Si le navigateur ne propose pas le bouton natif ici, utilise son menu pour installer l'application.</p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Sur Chrome ou Edge : menu du navigateur → Installer l'application ou Ajouter a l'ecran d'accueil.
          </div>
        </>
      )}
      {message ? <p className="mt-4 text-sm leading-6 text-slate-500">{message}</p> : null}
    </section>
  );
}
