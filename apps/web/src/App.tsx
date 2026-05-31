import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { PageLoader } from '@/components/layout/PageLoader';
import { SkipLink } from '@/components/layout/SkipLink';

const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const LearnPage = lazy(() => import('@/pages/LearnPage').then((m) => ({ default: m.LearnPage })));
const TopicDetailPage = lazy(() =>
  import('@/pages/TopicDetailPage').then((m) => ({ default: m.TopicDetailPage })),
);
const PracticeListPage = lazy(() =>
  import('@/pages/PracticeListPage').then((m) => ({ default: m.PracticeListPage })),
);
const PracticePage = lazy(() =>
  import('@/pages/PracticePage').then((m) => ({ default: m.PracticePage })),
);
const TrackPage = lazy(() => import('@/pages/TrackPage').then((m) => ({ default: m.TrackPage })));
const RevisionPage = lazy(() =>
  import('@/pages/RevisionPage').then((m) => ({ default: m.RevisionPage })),
);
const ImportPage = lazy(() => import('@/pages/ImportPage').then((m) => ({ default: m.ImportPage })));
const AssistantPage = lazy(() =>
  import('@/pages/AssistantPage').then((m) => ({ default: m.AssistantPage })),
);

function AppLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <SkipLink />
      <Navbar />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto max-w-6xl px-4 py-6 sm:py-8 focus:outline-none"
      >
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:topicSlug" element={<TopicDetailPage />} />
            <Route path="/practice" element={<PracticeListPage />} />
            <Route path="/practice/:questionSlug" element={<PracticePage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/revision" element={<RevisionPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/assistant" element={<AssistantPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
