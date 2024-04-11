import { expect, test } from '@playwright/test';

test('game page normal mode can open', async ({ page }) => {
    await page.goto('/game');
    await page.waitForSelector('.game');
});

test('game page normal mode with seed can open', async ({ page }) => {
    const seed = Math.floor(Math.random() * 1000);
    await page.goto(`/game?seed=${seed}`);
    await page.waitForSelector('.game');
});

test('game page memory mode can open', async ({ page }) => {
    await page.goto('/game?mode=Memory');
    await page.waitForSelector('.game');
});

test('game page memory mode with seed can open', async ({ page }) => {
    const seed = Math.floor(Math.random() * 1000);
    await page.goto(`/game?mode=Memory&seed=${seed}`);
    await page.waitForSelector('.game');
});

test('leaderboard page can open', async ({ page }) => {
    await page.goto('/leaderBoard/Normal');
    await page.waitForSelector('.podium');
});

test('leaderboard page memory mode can open', async ({ page }) => {
    await page.goto('leaderBoard/Memory');
    await page.waitForSelector('.podium');
});




