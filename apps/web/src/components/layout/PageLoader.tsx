import { Skeleton } from '@/components/ui/skeleton';

export function PageLoader() {
  return (
    <div className="space-y-4" role="status" aria-live="polite" aria-label="Loading page">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
