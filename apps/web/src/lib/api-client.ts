import type { ApiResponse, HealthCheckResponse } from '@dsa-studio/shared';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    if (body.success === false) {
      throw new Error(body.error.message);
    }
    throw new Error(`Request failed (${response.status})`);
  }

  if (body.success === false) {
    throw new Error(body.error.message);
  }

  return body.data;
}

export const apiClient = {
  getHealth: () => request<HealthCheckResponse>('/api/health'),
};
