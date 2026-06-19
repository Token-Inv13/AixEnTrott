import { useState } from 'react';
import { usePwaInstall } from '../hooks/use-pwa-install';

type PwaInstallCardProps = {
  compact?: boolean;
  className?: string;
};

export function PwaInstallCard({ compact = false, className = '' }: PwaInstallCardProps) {
  const { canInstall, isInstalled, isIos, promptInstall } = usePwaInstall();
  const [message, setMessage] = useState<string | null>(null);
  const wrapperClassName = ['rounded-[2rem] border border-slate-200 bg-white shadow-soft', compact ? 'p-5' : 'p-6', className]
    .filter(Boolean)
    .join(' ');

  if (isInstalled) {
    return (
      <section className={wrapperClassName}>
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
    <section className={wrapperClassName}>
      <p className="text-sm font-semibold text-slate-950">Mode app</p>
      <h2 className={`mt-2 font-semibold tracking-tight text-slate-950 ${compact ? 'text-xl' : 'text-2xl'}`}>
        Installer Aix en trott
      </h2>
      {canInstall ? (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Ajoute le guide a l'ecran d'accueil pour ouvrir plus vite la carte, les sorties et la recharge.
          </p>
          <button
            type="button"
            onClick={handleInstall}
            className={`inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky ${
              compact ? 'mt-4' : 'mt-5'
            }`}
          >
            Installer l'app
          </button>
        </>
      ) : isIos ? (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sur iPhone ou iPad, ouvre le menu de partage puis choisis "Sur l'ecran d'accueil".
          </p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Etapes : Safari - Partager - Sur l'ecran d'accueil.
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Si le navigateur ne propose pas le bouton natif ici, utilise son menu pour installer l'application.
          </p>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            Sur Chrome ou Edge : menu du navigateur - Installer l'application ou Ajouter a l'ecran d'accueil.
          </div>
        </>
      )}
      {message ? <p className="mt-4 text-sm leading-6 text-slate-500">{message}</p> : null}
    </section>
  );
}
