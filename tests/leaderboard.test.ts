import { test } from './svelteWaitFixture';
import { expect } from '@playwright/test';

test('normal leaderboard are corrrectrly displayed', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link').filter({ hasText: 'Leaderboard' }).click();
	await expect(page.locator('div.podium-player.first-place')).toContainText('save');
	await expect(page.locator('div.podium-player.second-place')).toContainText('aomda');
});

test('memory leaderboard are corrrectrly displayed', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Memory' }).click();
	await page.getByRole('link').filter({ hasText: 'Leaderboard' }).click();
	await expect(page.locator('div.podium-player.first-place')).toContainText('aomda');
	await expect(page.locator('div.podium-player.second-place')).toContainText('save');
});
