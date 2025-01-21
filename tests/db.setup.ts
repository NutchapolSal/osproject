import { expect } from '@playwright/test';
import { test } from './svelteWaitFixture';

test('wipe database', async ({ page }) => {
	//@ts-expect-error special goto option from svelte fixture
	await page.goto('/test-wipe-db', { wait_for_started: false });
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
