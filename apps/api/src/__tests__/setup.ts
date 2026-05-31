process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-jwt-secret-for-ci-only';
process.env.CORS_ORIGIN = 'http://localhost:5173';
