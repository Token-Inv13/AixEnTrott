import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { openPrivacySettings } from '../lib/analytics';
import { AnalyticsConsent } from './AnalyticsConsent';
import { PwaStatusBanner } from './PwaStatusBanner';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/planner', label: 'Preparer' },
  { to: '/sorties', label: 'Sorties' },
  { to: '/carte', label: 'Carte' },
  { to: '/recharge', label: 'Recharge' },
  { to: '/conseils', label: 'Conseils' },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-sky text-white shadow-soft' : 'text-slate-600 hover:bg-white hover:text-slate-950',
  ].join(' ');
}

export function Layout({ children }: { children: ReactNode }) {
  const footerLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/sorties', label: 'Sorties' },
    { to: '/carte', label: 'Carte' },
    { to: '/guides', label: 'Guides' },
    { to: '/recharge', label: 'Recharge' },
    { to: '/conseils', label: 'Conseils' },
    { to: '/a-propos', label: 'A propos' },
  ];
  const institutionalLinks = [
    { to: '/contact', label: 'Contact' },
    { to: '/mentions-legales', label: 'Mentions legales' },
    { to: '/confidentialite', label: 'Confidentialite' },
  ];

  return (
    <div className="app-shell min-h-screen">
      <PwaStatusBanner />
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="Aix en trott, retour a l'accueil">
            <img
              src="/logo-horizontal.png"
              alt="Aix en trott"
              className="h-10 w-auto max-w-[176px] sm:h-12 sm:max-w-[208px]"
            />
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-100 bg-white/80 px-4 py-2 md:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200/70 bg-white/75">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-5 border-t border-slate-200/60 pt-6 text-sm text-slate-500 lg:grid-cols-[minmax(16rem,1fr)_auto] lg:items-end">
            <p className="max-w-xl">Site independant. Distances, autonomie, pistes cyclables et recharge a verifier avant depart.</p>
            <div className="grid gap-3">
              <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Navigation du pied de page">
                {footerLinks.map((item) => (
                  <Link key={item.to} to={item.to} className="font-medium text-slate-600 transition hover:text-slate-950">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <nav className="flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-200/70 pt-3" aria-label="Informations legales et confidentialite">
                {institutionalLinks.map((item) => (
                  <Link key={item.to} to={item.to} className="font-medium text-slate-600 transition hover:text-slate-950">
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={openPrivacySettings}
                  className="font-medium text-slate-600 transition hover:text-slate-950"
                >
                  Parametres de confidentialite
                </button>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <AnalyticsConsent />
    </div>
  );
}
