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

/** GET /api/progress */
export interface ProgressOverviewResponse {
  overall: {
    totalSolved: number;
    totalQuestions: number;
    overallPercentage: number;
    byDifficulty: Array<{
      difficulty: string;
      solved: number;
      total: number;
      percentage: number;
    }>;
    topicsMastered: number;
    totalTopics: number;
    topicBreakdown: Array<{
      topicId: string;
      slug: string;
      name: string;
      solved: number;
      total: number;
      percentage: number;
      byStatus: Record<string, number>;
    }>;
  };
  streak: StreakInfoResponse;
  badges: BadgeDto[];
  badgesEarnedCount: number;
}

export interface StreakInfoResponse {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  dailyTarget: number;
  todayGoalMet: boolean;
  todaySolved: number;
}

export interface BadgeDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt: string | null;
}

export interface DailyActivityDto {
  id: string;
  userId: string;
  activityDate: string;
  questionsSolved: number;
  questionsAttempted: number;
  timeSpentMinutes: number;
  topicsCovered: string[];
  dailyGoalMet: boolean;
  streakDay: number;
  notes: string | null;
}

export interface AnalyticsResponse {
  periodDays: number;
  heatmap: Array<{
    date: string;
    questionsSolved: number;
    questionsAttempted: number;
    timeSpentMinutes: number;
    level: 0 | 1 | 2 | 3 | 4;
  }>;
  weeklyBar: Array<{
    date: string;
    label: string;
    solved: number;
    attempted: number;
    minutes: number;
  }>;
  topicPie: Array<{ name: string; value: number }>;
  summary: {
    totalSolvedInPeriod: number;
    activeDays: number;
    averagePerDay: number;
    peakDay: { date: string; questionsSolved: number } | null;
    successRate: number;
  };
  badges: BadgeDto[];
}
