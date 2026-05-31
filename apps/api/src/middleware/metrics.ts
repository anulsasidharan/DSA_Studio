import type { NextFunction, Request, Response } from 'express';

const metrics = {
  httpRequestsTotal: new Map<string, number>(),
  httpRequestDurationMs: [] as number[],
  httpErrorsTotal: 0,
  startedAt: Date.now(),
};

function routeKey(method: string, path: string): string {
  const normalized = path
    .replace(/\/[0-9a-f-]{36}/gi, '/:id')
    .replace(/\/[a-z0-9-]+(?=\/|$)/gi, (segment, offset, str) => {
      if (offset === 0 || str[offset - 1] !== '/') return segment;
      return segment.length > 24 ? '/:slug' : segment;
    });
  return `${method} ${normalized}`;
}

export function metricsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const started = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - started;
    const key = routeKey(req.method, req.route?.path ? `${req.baseUrl}${req.route.path}` : req.path);

    metrics.httpRequestsTotal.set(key, (metrics.httpRequestsTotal.get(key) ?? 0) + 1);
    metrics.httpRequestDurationMs.push(duration);
    if (metrics.httpRequestDurationMs.length > 1000) {
      metrics.httpRequestDurationMs.shift();
    }
    if (res.statusCode >= 500) {
      metrics.httpErrorsTotal += 1;
    }
  });

  next();
}

export function getPrometheusMetrics(): string {
  const uptimeSeconds = Math.floor((Date.now() - metrics.startedAt) / 1000);
  const durations = [...metrics.httpRequestDurationMs].sort((a, b) => a - b);
  const p95 =
    durations.length > 0 ? durations[Math.min(durations.length - 1, Math.floor(durations.length * 0.95))] : 0;

  const lines = [
    '# HELP dsa_api_uptime_seconds API process uptime',
    '# TYPE dsa_api_uptime_seconds gauge',
    `dsa_api_uptime_seconds ${uptimeSeconds}`,
    '# HELP dsa_api_http_requests_total Total HTTP requests by route',
    '# TYPE dsa_api_http_requests_total counter',
  ];

  for (const [key, count] of metrics.httpRequestsTotal) {
    const [method, route] = key.split(' ');
    lines.push(`dsa_api_http_requests_total{method="${method}",route="${route}"} ${count}`);
  }

  lines.push(
    '# HELP dsa_api_http_errors_total Total 5xx responses',
    '# TYPE dsa_api_http_errors_total counter',
    `dsa_api_http_errors_total ${metrics.httpErrorsTotal}`,
    '# HELP dsa_api_http_request_duration_ms_p95 Approximate P95 latency (ms)',
    '# TYPE dsa_api_http_request_duration_ms_p95 gauge',
    `dsa_api_http_request_duration_ms_p95 ${p95}`,
  );

  return `${lines.join('\n')}\n`;
}
