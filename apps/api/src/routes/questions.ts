import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { paginatedMeta, success } from '../lib/response.js';
import { serializeQuestionDetail, serializeQuestionSummary } from '../lib/serializers.js';
import { AppError } from '../middleware/errorHandler.js';
import { validate } from '../middleware/validate.js';
import { listQuestionsSchema, questionIdParamSchema, type ListQuestionsQuery } from '../validators/questions.js';

export const questionsRouter = Router();

questionsRouter.get('/', validate(listQuestionsSchema, 'query'), async (req, res, next) => {
  try {
    const { topicId, topicSlug, difficulty, tag, page, limit } = req.query as unknown as ListQuestionsQuery;

    let resolvedTopicId = topicId;
    if (topicSlug && !resolvedTopicId) {
      const topic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
      if (!topic) {
        throw new AppError(404, 'NOT_FOUND', 'Topic not found');
      }
      resolvedTopicId = topic.topicId;
    }

    const where = {
      isActive: true,
      ...(resolvedTopicId ? { topicId: resolvedTopicId } : {}),
      ...(difficulty
        ? { difficulty: difficulty as 'basic' | 'intermediate' | 'advanced' }
        : {}),
      ...(tag ? { tags: { string_contains: `"${tag}"` } } : {}),
    };

    const [total, questions] = await Promise.all([
      prisma.question.count({ where }),
      prisma.question.findMany({
        where,
        include: { topic: true },
        orderBy: [{ difficulty: 'asc' }, { title: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    res.json(
      success({
        items: questions.map(serializeQuestionSummary),
        meta: paginatedMeta(page, limit, total),
      }),
    );
  } catch (error) {
    next(error);
  }
});

questionsRouter.get('/:id', validate(questionIdParamSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await prisma.question.findFirst({
      where: { questionId: id, isActive: true },
      include: {
        topic: true,
        testCases: {
          where: { isSample: true },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!question) {
      throw new AppError(404, 'NOT_FOUND', 'Question not found');
    }

    res.json(success({ question: serializeQuestionDetail(question) }));
  } catch (error) {
    next(error);
  }
});
