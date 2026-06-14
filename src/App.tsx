import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartePage } from './pages/CartePage';
import { AboutPage } from './pages/AboutPage';
import { ConseilsPage } from './pages/ConseilsPage';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { RechargePage } from './pages/RechargePage';
import { SortieDetailPage } from './pages/SortieDetailPage';
import { SortiesPage } from './pages/SortiesPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/sorties" element={<SortiesPage />} />
        <Route path="/sorties/:id" element={<SortieDetailPage />} />
        <Route path="/carte" element={<CartePage />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/conseils" element={<ConseilsPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
