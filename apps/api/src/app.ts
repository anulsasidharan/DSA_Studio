import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/notFoundHandler.js';
import { requestIdMiddleware } from './middleware/requestId.js';
import { metricsMiddleware } from './middleware/metrics.js';

export function createApp() {
  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  const app = express();

  app.use(requestIdMiddleware);
  app.use(metricsMiddleware);

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(
    cors({
      origin: corsOrigin.split(',').map((origin) => origin.trim()),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/', (_req, res) => {
    res.json({
      name: 'DSA Studio API',
      docs: '/api/docs',
    });
  });

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
