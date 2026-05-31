import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/store/authStore';
import type { ProgressOverviewResponse } from '@dsa-studio/shared';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const { data: health, loading, error } = useHealthCheck();
  const [progress, setProgress] = useState<ProgressOverviewResponse | null>(null);
  const [progressLoading, setProgressLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      setProgressLoading(false);
      return;
    }
    apiClient
      .getProgress()
      .then(setProgress)
      .catch(() => setProgress(null))
      .finally(() => setProgressLoading(false));
  }, [token]);

  const streak = progress?.streak;
  const overall = progress?.overall;
  const dailyTarget = streak?.dailyTarget ?? user?.dailyTarget ?? 3;
  const todaySolved = streak?.todaySolved ?? 0;
  const currentStreak = streak?.currentStreak ?? user?.currentStreak ?? 0;
  const totalSolved = overall?.totalSolved ?? user?.totalQuestionsSolved ?? 0;

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to DSA Studio</h1>
        <p className="max-w-2xl text-muted-foreground">
          Master data structures and algorithms with structured paths, theory content,
          Monaco-powered practice, and submission grading.
          {user ? ` Welcome back, ${user.username}.` : ' Sign in to save progress.'}
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {progressLoading ? (
          <>
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </>
        ) : (
          <>
            <StatCard
              icon={Flame}
              label="Current streak"
              value={`${currentStreak} days`}
              hint={
                streak?.longestStreak
                  ? `Longest: ${streak.longestStreak} days`
                  : 'Start practicing to build your streak'
              }
            />
            <StatCard
              icon={Trophy}
              label="Questions solved"
              value={String(totalSolved)}
              hint={
                overall
                  ? `${overall.overallPercentage}% of all questions`
                  : 'Across all topics'
              }
            />
            <StatCard
              icon={Target}
              label="Today's goal"
              value={`${todaySolved} / ${dailyTarget}`}
              hint={streak?.todayGoalMet ? 'Goal met!' : 'Default target: 3 questions/day'}
              highlight={streak?.todayGoalMet}
            />
          </>
        )}
      </section>

      {token && overall && overall.topicBreakdown.length > 0 && (
        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Continue learning</h2>
          {[...overall.topicBreakdown]
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 1)
            .map((topic) => (
              <div key={topic.topicId} className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-muted-foreground">
                    {topic.solved}/{topic.total} ({topic.percentage}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(100, topic.percentage)}%` }}
                  />
                </div>
                {topic.slug && (
                  <Button variant="link" className="h-auto p-0" asChild>
                    <Link to={`/learn/${topic.slug}`}>Continue →</Link>
                  </Button>
                )}
              </div>
            ))}
        </section>
      )}

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
        <Button asChild>
          <Link to="/learn">Browse topics</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/practice">Start practicing</Link>
        </Button>
        {token && (
          <Button variant="outline" asChild>
            <Link to="/track">View progress</Link>
          </Button>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-lg border bg-card p-4 shadow-sm${
        highlight ? ' border-emerald-500/50' : ''
      }`}
    >
      <div className="mb-3 flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </article>
  );
}
