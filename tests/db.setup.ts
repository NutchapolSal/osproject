import { expect, test } from '@playwright/test';

test('wipe database', async ({ page }) => {
	await page.goto('/test-wipe-db');
	await page.goto('/leaderBoard/Normal');
	await expect(
		page.locator('.podium-player a').or(page.locator('div.boardcontainer div.ranking'))
	).toHaveCount(0);
	await page.goto('/leaderBoard/Memory');
	await expect(
		page.locator('.podium-player a').or(page.locator('div.boardcontainer div.ranking'))
	).toHaveCount(0);
	await page.goto('/login/test-generate?key=user1');
	await page.goto('/login/test-generate?key=user1');
});
