import { Router } from 'express';
import { authRouter } from './auth.js';
import { docsRouter } from './docs.js';
import { healthRouter } from './health.js';
import { questionsRouter } from './questions.js';
import { topicsRouter } from './topics.js';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use('/docs', docsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/questions', questionsRouter);
