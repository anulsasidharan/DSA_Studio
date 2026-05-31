import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads dashboard with branding and navigation', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /welcome to dsa studio/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /dsa studio home/i })).toBeVisible();
    await expect(page.getByRole('navigation', { name: /main navigation/i })).toBeVisible();
  });

  test('skip link targets main content', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await skipLink.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});

test.describe('Learn flow', () => {
  test('navigates to topic browser', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^learn$/i }).click();

    await expect(page).toHaveURL(/\/learn/);
    await expect(page.getByRole('heading', { name: /^learn$/i })).toBeVisible();
  });
});

test.describe('Auth dialog', () => {
  test('opens sign-in dialog from navbar', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});
