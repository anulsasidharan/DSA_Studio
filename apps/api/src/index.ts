import 'dotenv/config';
import { createApp } from './app.js';

const PORT = Number(process.env.PORT ?? 4000);
const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[api] listening on http://localhost:${PORT}`);
  });
}

export default app;
