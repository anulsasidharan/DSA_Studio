import { calculatePriority } from '../../services/revision.js';
import { toUtcDateOnly } from '../../services/dailyActivity.js';

describe('calculatePriority', () => {
  const today = toUtcDateOnly(new Date('2026-05-31T12:00:00Z'));

  it('returns base priority of 1 for easy overdue-free items', () => {
    expect(
      calculatePriority({
        wrongAttempts: 0,
        userDifficultyRating: null,
        nextRevisionDate: today,
        difficulty: 'basic',
        today,
      }),
    ).toBe(1);
  });

  it('increases priority for many wrong attempts', () => {
    expect(
      calculatePriority({
        wrongAttempts: 3,
        userDifficultyRating: null,
        nextRevisionDate: today,
        difficulty: 'basic',
        today,
      }),
    ).toBe(3);
  });

  it('caps priority at 5', () => {
    const overdue = new Date(today);
    overdue.setUTCDate(overdue.getUTCDate() - 30);

    expect(
      calculatePriority({
        wrongAttempts: 5,
        userDifficultyRating: 5,
        nextRevisionDate: overdue,
        difficulty: 'advanced',
        today,
      }),
    ).toBe(5);
  });

  it('adds priority for advanced difficulty', () => {
    expect(
      calculatePriority({
        wrongAttempts: 0,
        userDifficultyRating: null,
        nextRevisionDate: today,
        difficulty: 'advanced',
        today,
      }),
    ).toBe(2);
  });
});
