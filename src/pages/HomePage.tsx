import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { chargingPoints } from '../data/chargingPoints';
import { editorialGuides, getEditorialGuidePath } from '../data/editorialPages';
import { distanceBands, spots } from '../data/spots';
import { useRouteOrigin } from '../context/route-origin-context';
import { hasGoogleMapsPublicApiKey } from '../lib/google-maps-config';
import { areaLabel, formatRechargeStatus } from '../lib/spot-utils';
import { Pill, SectionKicker, SectionTitle } from '../components/Badges';
import { AdSlot } from '../components/AdSlot';
import { PageSeo } from '../components/PageSeo';
import { PwaInstallCard } from '../components/PwaInstallCard';
import { ADSENSE_SLOTS } from '../config/ads';
import { buildHowToNode, buildSeoGraph, buildWebsiteNodes, buildWebPageNode } from '../lib/seo';

const GoogleMapView = lazy(() => import('../components/GoogleMapView').then((module) => ({ default: module.GoogleMapView })));
const MapView = lazy(() => import('../components/MapView').then((module) => ({ default: module.MapView })));

const quickActions = [
  { to: '/sorties?moment=soir', label: 'Je veux sortir ce soir', tone: 'sky' as const },
  { to: '/sorties?moment=weekend', label: 'Je veux une sortie week-end', tone: 'emerald' as const },
  { to: '/recharge', label: 'Je cherche une recharge', tone: 'amber' as const },
];

export function HomePage() {
  const highlights = spots.slice(0, 6);
  const guideHighlights = editorialGuides.slice(0, 4);
  const { origin } = useRouteOrigin();
  const hasGoogleMaps = hasGoogleMapsPublicApiKey();
  const howToSteps = [
    { name: 'Choisir ton temps disponible', text: 'Repere si tu veux une sortie rapide, du soir, week-end ou une journee.', path: '/sorties' },
    { name: 'Filtrer par distance ou ambiance', text: 'Utilise le catalogue pour trier les sorties par distance, ambiance ou recharge.', path: '/sorties' },
    { name: 'Verifier autonomie et recharge', text: 'Controle ton autonomie indicative et les points de recharge avant depart.', path: '/planner' },
    { name: 'Partir equipe', text: 'Pars avec batterie pleine, eau, casque et antivol.', path: '/conseils' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageSeo
        title="Sorties en trottinette autour d'Aix-en-Provence"
        description="Preparez vos sorties en trottinette electrique autour d'Aix-en-Provence : sorties, carte, recharge, autonomie et conseils pratiques."
        path="/"
        jsonLd={buildSeoGraph([
          ...buildWebsiteNodes(),
          buildWebPageNode({
            path: '/',
            title: "Sorties en trottinette autour d'Aix-en-Provence",
            description:
              "Preparez vos sorties en trottinette electrique autour d'Aix-en-Provence : sorties, carte, recharge, autonomie et conseils pratiques.",
          }),
          buildHowToNode('/', 'Comment preparer une sortie en trottinette autour d Aix-en-Provence', howToSteps),
        ])}
      />
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
          <SectionKicker>Aix en trott</SectionKicker>
          <SectionTitle description="Sorties, carte et recharge autour d'Aix pour preparer plus vite.">
            Prepare ta sortie en trottinette autour d'Aix-en-Provence
          </SectionTitle>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Des idees triees par distance, ambiance et recharge, avec une lecture simple de l'autonomie.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`inline-flex items-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  action.tone === 'sky'
                    ? 'bg-sky text-white shadow-soft hover:bg-sky/90'
                    : action.tone === 'emerald'
                      ? 'bg-emerald-600 text-white shadow-soft hover:bg-emerald-700'
                      : 'bg-amber-400 text-slate-950 shadow-soft hover:bg-amber-300'
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50/70 p-4">
            <p className="text-sm font-semibold text-slate-950">Preparer ma sortie selon mon autonomie</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Compare ton autonomie, le style de sortie et la recharge.</p>
            <Link
              to="/planner"
              className="mt-4 inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky"
            >
              Ouvrir le planner
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {distanceBands.map((band) => (
              <div key={band} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Zone</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{band}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">Carte utile</p>
                <p className="text-sm text-slate-500">Sorties et recharge autour d'Aix</p>
              </div>
              <Pill tone="sky">{hasGoogleMaps ? 'Google Maps' : 'OpenStreetMap'}</Pill>
            </div>
            <div className="mt-4">
              <Suspense fallback={<div className="h-[19rem] rounded-[1.5rem] bg-slate-100" />}>
                {hasGoogleMaps ? (
                  <GoogleMapView
                    spots={spots.slice(0, 8)}
                    chargingPoints={chargingPoints.slice(0, 4)}
                    origin={origin}
                    height="h-[19rem]"
                  />
                ) : (
                  <MapView
                    spots={spots.slice(0, 8)}
                    chargingPoints={chargingPoints.slice(0, 4)}
                    origin={origin}
                    height="h-[19rem]"
                  />
                )}
              </Suspense>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-950">Resume rapide</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Sorties pretes', value: spots.length },
                { label: 'Points recharge', value: chargingPoints.length },
                { label: 'Zones couvertes', value: 5 },
                { label: 'Alerte', value: 'Recharge a verifier' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdSlot
        className="mt-8"
        slotId={ADSENSE_SLOTS.homeBanner}
        label="Banniere accueil"
      />

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
          <SectionKicker>Mode app</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Installer le guide sur ton telephone</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Pratique pour garder la carte, le planner et les fiches a portee de main avant de partir.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              'Acces plus rapide au planner',
              "Ecran d'accueil propre et sans onglets",
              'Pages recentes disponibles hors ligne',
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
        <PwaInstallCard compact />
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {[
          {
            title: '0-3 km',
            text: 'Boucles tres courtes pour une sortie simple.',
            pills: ['centre', 'parcs', 'marche'],
          },
          {
            title: '3-7 km',
            text: "Le bon format pour sortir sans trop tirer sur la batterie.",
            pills: ['calme', 'nature', 'patrimoine'],
          },
          {
            title: '+7 km',
            text: 'A garder pour une sortie preparee avec marge ou retour alternatif.',
            pills: ['journee', 'recharge', 'retour planifie'],
          },
        ].map((block) => (
          <article key={block.title} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-sky">{block.title}</p>
            <p className="mt-3 text-base leading-7 text-slate-600">{block.text}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {block.pills.map((pill) => (
                <Pill key={pill}>{pill}</Pill>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <SectionKicker>Comment utiliser le site ?</SectionKicker>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">En 4 etapes</h2>
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            'Choisis ton temps disponible',
            'Filtre par distance ou ambiance',
            "Verifie l'autonomie et la recharge",
            'Pars avec batterie pleine, eau, casque et antivol',
          ].map((step, index) => (
            <li key={step} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Top depart</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Sorties faciles a lancer</h2>
          <div className="mt-5 grid gap-3">
            {highlights.map((spot) => (
              <Link
                key={spot.id}
                to={`/sorties/${spot.id}`}
                className="rounded-2xl border border-slate-200 px-4 py-4 transition hover:border-sky hover:bg-sky-50/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{spot.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {spot.distanceLabel} · {spot.duration} · {areaLabel(spot.area)}
                    </p>
                  </div>
                  <Pill>{formatRechargeStatus(spot.rechargeStatus)}</Pill>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <SectionKicker>Recharge</SectionKicker>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">A retenir</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
            <li>Une borne voiture n'est pas automatiquement compatible.</li>
            <li>Meme avec une prise 220V annoncee, verifie avant de partir.</li>
            <li>Les solutions privees sont utiles pour le train et les longues sorties.</li>
            <li>Les applis servent a reperer une prise, pas a garantir la compatibilite.</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionKicker>Guides utiles</SectionKicker>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Pages a lire selon ton besoin</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Recharge, Cassis, Sainte-Victoire, sorties proches : des pages courtes pour aller vite sur les recherches les plus frequentes.
            </p>
          </div>
          <Link to="/guides" className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky">
            Tous les guides
          </Link>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {guideHighlights.map((guide) => (
            <Link
              key={guide.slug}
              to={getEditorialGuidePath(guide.slug)}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 transition hover:border-sky hover:bg-sky-50/60"
            >
              <p className="text-sm font-semibold text-sky">{guide.shortTitle}</p>
              <p className="mt-2 text-base font-semibold text-slate-950">{guide.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
