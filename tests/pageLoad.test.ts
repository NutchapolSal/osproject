import { expect, test } from '@playwright/test';

test('game page normal mode can open', async ({ page }) => {
    await page.goto('/game');
    await expect(page.getByText('target')).toBeVisible();
});

test('game page normal mode with seed can open', async ({ page }) => {
    const seed = Math.floor(Math.random() * 1000);
    await page.goto(`/game?seed=${seed}`);
    await expect(page.getByText('target')).toBeVisible();
});

test('game page memory mode can open', async ({ page }) => {
    await page.goto('/game?mode=Memory');
    await expect(page.getByText('target')).toBeVisible();
});

test('game page memory mode with seed can open', async ({ page }) => {
    const seed = Math.floor(Math.random() * 1000);
    await page.goto(`/game?mode=Memory&seed=${seed}`);
    await expect(page.getByText('target')).toBeVisible();
});

test('leaderboard page can open', async ({ page }) => {
    await page.goto('/leaderBoard/Normal');
    await expect(page.getByRole('heading', { name: '🎃 Leaderboard 🎃' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Normal' })).toBeVisible();
});

test('leaderboard page memory mode can open', async ({ page }) => {
    await page.goto('leaderBoard/Memory');
    await expect(page.getByRole('heading', { name: '🎃 Leaderboard 🎃' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Memory' })).toBeVisible();
});

test('user page can open', async ({ page }) => {
    await page.goto('/login/test-generate');
    await expect(page.getByText('Recent')).toBeVisible();
});

test('how to play page can open', async ({ page }) => {
    await page.goto('/help');
    await expect(page.getByRole('heading', { name: 'How to Play' })).toBeVisible();
});

test('about page can open', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});



