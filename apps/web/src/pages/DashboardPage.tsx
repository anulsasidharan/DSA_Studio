import type { ComponentType } from 'react';
import { Flame, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { useAppStore } from '@/store/appStore';

export function DashboardPage() {
  const { dailyGoal, questionsSolvedToday } = useAppStore();
  const { data: health, loading, error } = useHealthCheck();

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to DSA Studio</h1>
        <p className="max-w-2xl text-muted-foreground">
          Master data structures and algorithms with structured paths, daily tracking,
          and AI-powered assistance. Phase 1 scaffold is ready — learning features arrive
          in upcoming tasks.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={Flame}
          label="Current streak"
          value="0 days"
          hint="Start practicing to build your streak"
        />
        <StatCard
          icon={Trophy}
          label="Questions solved"
          value="0"
          hint="Across all topics"
        />
        <StatCard
          icon={Target}
          label="Today's goal"
          value={`${questionsSolvedToday} / ${dailyGoal}`}
          hint="Default target: 3 questions/day"
        />
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">System status</h2>
        {loading && <p className="text-sm text-muted-foreground">Checking API…</p>}
        {!loading && error && (
          <p className="text-sm text-destructive">
            API unreachable: {error}. Run <code className="text-xs">npm run dev:api</code>{' '}
            to start the backend.
          </p>
        )}
        {!loading && health && (
          <dl className="grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Service</dt>
              <dd className="font-medium">{health.service}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium capitalize">{health.status}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Version</dt>
              <dd className="font-medium">{health.version}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Timestamp</dt>
              <dd className="font-medium">{health.timestamp}</dd>
            </div>
          </dl>
        )}
      </section>

      <section className="flex flex-wrap gap-3">
        <Button>Browse topics (Phase 2)</Button>
        <Button variant="outline">View progress (Phase 3)</Button>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}
