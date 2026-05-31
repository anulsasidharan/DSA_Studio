/** Minimal DB row shapes — avoids importing model types from @prisma/client. */

export interface DbUser {
  userId: string;
  email: string;
  username: string;
  fullName: string | null;
  avatarUrl: string | null;
  learningLevel: string;
  dailyTarget: number;
  currentStreak: number;
  longestStreak: number;
  totalQuestionsSolved: number;
  createdAt: Date;
  lastActive: Date | null;
}

export interface DbTopic {
  topicId: string;
  slug: string;
  topicName: string;
  description: string | null;
  category: string | null;
  difficultyLevel: string;
  prerequisites: unknown;
  orderIndex: number | null;
  iconUrl: string | null;
  isActive: boolean;
  totalQuestions: number;
}

export interface DbQuestion {
  questionId: string;
  topicId: string;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  hints: unknown;
  tags: unknown;
  source: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  constraints: string | null;
  inputFormat: string | null;
  outputFormat: string | null;
  timeComplexity: string | null;
  spaceComplexity: string | null;
}

export interface DbTestCase {
  testCaseId: string;
  questionId: string;
  input: string;
  expectedOutput: string;
  explanation: string | null;
  isSample: boolean;
  isHidden: boolean;
  orderIndex: number | null;
}

export type ChatMessageType = 'query' | 'hint' | 'review';
