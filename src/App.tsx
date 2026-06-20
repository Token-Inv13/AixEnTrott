import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RouteOriginProvider } from './context/route-origin-context';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const PlannerPage = lazy(() => import('./pages/PlannerPage').then((module) => ({ default: module.PlannerPage })));
const SortiesPage = lazy(() => import('./pages/SortiesPage').then((module) => ({ default: module.SortiesPage })));
const SortieDetailPage = lazy(() => import('./pages/SortieDetailPage').then((module) => ({ default: module.SortieDetailPage })));
const CartePage = lazy(() => import('./pages/CartePage').then((module) => ({ default: module.CartePage })));
const RechargePage = lazy(() => import('./pages/RechargePage').then((module) => ({ default: module.RechargePage })));
const ConseilsPage = lazy(() => import('./pages/ConseilsPage').then((module) => ({ default: module.ConseilsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const GuideHubPage = lazy(() => import('./pages/GuideHubPage').then((module) => ({ default: module.GuideHubPage })));
const GuideDetailPage = lazy(() => import('./pages/GuideDetailPage').then((module) => ({ default: module.GuideDetailPage })));

function PageFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-500">Chargement de la page...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouteOriginProvider>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/sorties" element={<SortiesPage />} />
            <Route path="/sorties/:id" element={<SortieDetailPage />} />
            <Route path="/carte" element={<CartePage />} />
            <Route path="/recharge" element={<RechargePage />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/guides" element={<GuideHubPage />} />
            <Route path="/guides/:slug" element={<GuideDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </RouteOriginProvider>
  );
}
