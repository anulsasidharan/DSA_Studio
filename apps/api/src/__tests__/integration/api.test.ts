import request from 'supertest';
import { createApp } from '../../app.js';

describe('GET /api/health', () => {
  const app = createApp();

  it('returns ok status payload', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.service).toBe('dsa-studio-api');
    expect(res.headers['x-request-id']).toBeDefined();
  });
});

describe('GET /api/metrics', () => {
  const app = createApp();

  it('returns prometheus text format', async () => {
    await request(app).get('/api/health');
    const res = await request(app).get('/api/metrics');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/plain');
    expect(res.text).toContain('dsa_api_uptime_seconds');
    expect(res.text).toContain('dsa_api_http_requests_total');
  });
});

describe('GET /api/topics', () => {
  const app = createApp();
  const hasDatabase = Boolean(process.env.DATABASE_URL);

  (hasDatabase ? it : it.skip)('lists seeded topics', async () => {
    const res = await request(app).get('/api/topics');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.items)).toBe(true);
    expect(res.body.data.items.length).toBeGreaterThan(0);
  });
});

describe('POST /api/auth/register + login', () => {
  const app = createApp();
  const hasDatabase = Boolean(process.env.DATABASE_URL);

  (hasDatabase ? it : it.skip)('registers a user and returns JWT', async () => {
    const suffix = Date.now();
    const email = `test-${suffix}@example.com`;

    const register = await request(app).post('/api/auth/register').send({
      username: `user${suffix}`,
      email,
      password: 'TestPass123!',
      fullName: 'Test User',
    });

    expect(register.status).toBe(201);
    expect(register.body.success).toBe(true);
    expect(register.body.data.token).toBeDefined();
    expect(register.body.data.user.email).toBe(email);

    const login = await request(app).post('/api/auth/login').send({
      email,
      password: 'TestPass123!',
    });

    expect(login.status).toBe(200);
    expect(login.body.data.token).toBeDefined();

    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${login.body.data.token}`);

    expect(me.status).toBe(200);
    expect(me.body.data.user.email).toBe(email);
  });
});
