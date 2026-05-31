import type { AttemptStatus } from './enums.js';

/** Standard API success envelope */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/** Standard API error envelope */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/** GET /api/health */
export interface HealthCheckResponse {
  status: 'ok';
  service: 'dsa-studio-api';
  version: string;
  timestamp: string;
}

/** POST /api/submit response shape */
export interface SubmitResponse {
  status: AttemptStatus;
  testCasesPassed: number;
  totalTestCases: number;
  executionTimeMs: number;
  memoryUsedMb: number;
}

/** Pagination query params shared by list endpoints */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginatedMeta;
}
