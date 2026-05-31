import type {
  Difficulty,
  LearningLevel,
  QuestionSource,
  User,
} from '@dsa-studio/shared';
import type { Question, Topic, TestCase, User as DbUser } from '@prisma/client';

export function serializeUser(user: DbUser): User {
  return {
    id: user.userId,
    email: user.email,
    username: user.username,
    displayName: user.fullName,
    avatarUrl: user.avatarUrl,
    learningLevel: user.learningLevel as LearningLevel,
    dailyTarget: user.dailyTarget,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    totalQuestionsSolved: user.totalQuestionsSolved,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.lastActive?.toISOString() ?? user.createdAt.toISOString(),
  };
}

export function serializeTopic(topic: Topic) {
  const prerequisites = Array.isArray(topic.prerequisites)
    ? (topic.prerequisites as string[])
    : [];

  return {
    id: topic.topicId,
    slug: topic.slug,
    name: topic.topicName,
    description: topic.description,
    category: topic.category ?? '',
    difficulty: topic.difficultyLevel as Difficulty,
    orderIndex: topic.orderIndex ?? 0,
    icon: topic.iconUrl,
    prerequisiteIds: prerequisites,
    isActive: topic.isActive,
    totalQuestions: topic.totalQuestions,
    theory: {
      overview: topic.description ?? '',
      whenToUse: getTheoryBullets(topic.category),
      complexityNotes: getComplexityNotes(topic.difficultyLevel as Difficulty),
    },
  };
}

function getTheoryBullets(category: string | null): string[] {
  const map: Record<string, string[]> = {
    Arrays: [
      'Use two pointers for sorted arrays and palindrome checks',
      'Sliding window for contiguous subarray problems',
      'Prefix sums for range queries',
    ],
    'Linked Lists': [
      'Fast/slow pointers for cycle detection',
      'Dummy head simplifies insert/delete edge cases',
    ],
    Trees: [
      'DFS for paths and depth; BFS for level-order',
      'BST in-order traversal yields sorted order',
    ],
    Graphs: ['BFS for shortest unweighted paths', 'DFS for connectivity and cycles'],
    'Dynamic Programming': [
      'Define state and recurrence before coding',
      'Tabulation vs memoization based on space needs',
    ],
  };
  return map[category ?? ''] ?? ['Practice pattern recognition', 'Analyze constraints before choosing approach'];
}

function getComplexityNotes(difficulty: Difficulty): string {
  const notes: Record<Difficulty, string> = {
    basic: 'Focus on O(n) or O(n log n) solutions with clear invariants.',
    intermediate: 'Expect O(n) or O(n log n); watch for hidden quadratic loops.',
    advanced: 'Optimize time and space; prove correctness of greedy/DP choices.',
  };
  return notes[difficulty];
}

export function serializeSolution(solution: {
  solutionId: string;
  questionId: string;
  language: string;
  approachName: string | null;
  code: string;
  explanation: string | null;
  timeComplexity: string | null;
  spaceComplexity: string | null;
  isOptimal: boolean;
}) {
  return {
    id: solution.solutionId,
    questionId: solution.questionId,
    language: solution.language,
    approach: solution.approachName ?? 'Standard',
    code: solution.code,
    explanation: solution.explanation,
    timeComplexity: solution.timeComplexity ?? '',
    spaceComplexity: solution.spaceComplexity ?? '',
    isOptimal: solution.isOptimal,
  };
}

export function serializeQuestionSummary(question: Question & { topic?: Topic | null }) {
  const hints = Array.isArray(question.hints) ? (question.hints as string[]) : [];
  const tags = Array.isArray(question.tags) ? (question.tags as string[]) : [];

  return {
    id: question.questionId,
    topicId: question.topicId,
    topicSlug: question.topic?.slug ?? null,
    slug: question.slug,
    title: question.title,
    description: question.description,
    difficulty: question.difficulty as Difficulty,
    hints,
    tags,
    source: question.source as QuestionSource,
    isActive: question.isActive,
    createdAt: question.createdAt.toISOString(),
    updatedAt: question.updatedAt.toISOString(),
  };
}

export function serializeQuestionDetail(
  question: Question & { topic?: Topic | null; testCases?: TestCase[] },
) {
  const sampleTestCases = (question.testCases ?? [])
    .filter((tc) => tc.isSample)
    .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
    .map((tc) => ({
      id: tc.testCaseId,
      questionId: tc.questionId,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      explanation: tc.explanation,
      isSample: tc.isSample,
      isHidden: tc.isHidden,
      orderIndex: tc.orderIndex ?? 0,
    }));

  return {
    ...serializeQuestionSummary(question),
    constraints: question.constraints,
    inputFormat: question.inputFormat,
    outputFormat: question.outputFormat,
    timeComplexity: question.timeComplexity,
    spaceComplexity: question.spaceComplexity,
    testCases: sampleTestCases,
  };
}
