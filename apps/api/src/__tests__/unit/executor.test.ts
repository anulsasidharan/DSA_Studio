import { outputsMatch } from '../../sandbox/executor.js';
import { addUtcDays, isSameUtcDay, toUtcDateOnly } from '../../services/dailyActivity.js';

describe('outputsMatch', () => {
  it('matches trimmed output with CRLF normalization', () => {
    expect(outputsMatch('hello\r\nworld', 'hello\nworld')).toBe(true);
    expect(outputsMatch('  answer  ', 'answer')).toBe(true);
  });

  it('rejects mismatched output', () => {
    expect(outputsMatch('1\n2', '1\n3')).toBe(false);
  });
});

describe('dailyActivity date helpers', () => {
  it('normalizes to UTC midnight', () => {
    const date = toUtcDateOnly(new Date('2026-05-31T23:59:59Z'));
    expect(date.toISOString()).toBe('2026-05-31T00:00:00.000Z');
  });

  it('adds UTC days correctly', () => {
    const start = toUtcDateOnly(new Date('2026-05-30T00:00:00Z'));
    const next = addUtcDays(start, 1);
    expect(next.toISOString()).toBe('2026-05-31T00:00:00.000Z');
  });

  it('compares same UTC day', () => {
    const a = new Date('2026-05-31T08:00:00Z');
    const b = new Date('2026-05-31T20:00:00Z');
    expect(isSameUtcDay(a, b)).toBe(true);
  });
});
