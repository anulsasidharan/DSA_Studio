import type { AttemptStatus } from '@dsa-studio/shared';
import { prisma } from '../lib/prisma.js';

export async function recordAttempt(
  userId: string,
  questionId: string,
  topicId: string,
  language: string,
  code: string,
  status: AttemptStatus,
  testCasesPassed: number,
  totalTestCases: number,
  executionTimeMs: number,
  memoryUsedMb: number,
) {
  const now = new Date();
  const accepted = status === 'accepted';

  await prisma.userAttempt.create({
    data: {
      userId,
      questionId,
      language,
      submittedCode: code,
      status,
      testCasesPassed,
      totalTestCases,
      executionTime: executionTimeMs,
      memoryUsed: memoryUsedMb,
      attemptedAt: now,
    },
  });

  const existing = await prisma.userProgress.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  const newStatus = accepted
    ? 'solved'
    : existing?.status === 'solved' || existing?.status === 'mastered'
      ? existing.status
      : 'attempted';

  await prisma.userProgress.upsert({
    where: { userId_questionId: { userId, questionId } },
    create: {
      userId,
      questionId,
      topicId,
      status: newStatus,
      firstAttemptDate: now,
      lastAttemptDate: now,
      solvedDate: accepted ? now : null,
      totalAttempts: 1,
      bestExecutionTime: accepted ? executionTimeMs : null,
    },
    update: {
      status: newStatus,
      lastAttemptDate: now,
      solvedDate: accepted ? now : existing?.solvedDate,
      totalAttempts: { increment: 1 },
      bestExecutionTime:
        accepted && executionTimeMs
          ? existing?.bestExecutionTime
            ? Math.min(Number(existing.bestExecutionTime), executionTimeMs)
            : executionTimeMs
          : existing?.bestExecutionTime,
    },
  });

  if (accepted) {
    await prisma.question.update({
      where: { questionId },
      data: { totalSolved: { increment: 1 }, totalAttempts: { increment: 1 } },
    });

    const user = await prisma.user.findUnique({ where: { userId } });
    if (user) {
      const wasSolved = existing?.status === 'solved' || existing?.status === 'mastered';
      if (!wasSolved) {
        await prisma.user.update({
          where: { userId },
          data: {
            totalQuestionsSolved: { increment: 1 },
            lastActive: now,
          },
        });
      }
    }
  } else {
    await prisma.question.update({
      where: { questionId },
      data: { totalAttempts: { increment: 1 } },
    });
  }
}

export async function getQuestionProgressStatus(
  userId: string | undefined,
  questionId: string,
): Promise<string | null> {
  if (!userId) return null;

  const progress = await prisma.userProgress.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  return progress?.status ?? 'not_attempted';
}

export async function canViewSolutions(
  userId: string | undefined,
  questionId: string,
): Promise<boolean> {
  if (!userId) return false;

  const progress = await prisma.userProgress.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });

  return (
    progress?.status === 'attempted' ||
    progress?.status === 'solved' ||
    progress?.status === 'mastered'
  );
}
