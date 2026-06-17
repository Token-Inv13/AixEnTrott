import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Accueil' },
  { to: '/planner', label: 'Préparer' },
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
    { to: '/recharge', label: 'Recharge' },
    { to: '/conseils', label: 'Conseils' },
    { to: '/a-propos', label: 'À propos' },
  ];

  return (
    <div className="app-shell min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-emerald-500 text-sm font-bold text-white shadow-soft">
              AeT
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-wide text-slate-950">Aix en trott</span>
              <span className="block text-xs text-slate-500">Sorties en trottinette autour d’Aix</span>
            </span>
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
          <div className="grid gap-4 border-t border-slate-200/60 pt-6 text-sm text-slate-500 md:grid-cols-[1fr_auto] md:items-end">
            <p>Site indépendant. Distances, autonomie, pistes cyclables et recharges à vérifier avant départ.</p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              {footerLinks.map((item) => (
                <Link key={item.to} to={item.to} className="font-medium text-slate-600 transition hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
