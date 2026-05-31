import { Navbar } from '@/components/layout/Navbar';
import { DashboardPage } from '@/pages/DashboardPage';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;
