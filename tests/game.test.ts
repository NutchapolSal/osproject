import { test } from '@playwright/test';
import { playGame } from './autogame';

test('try play game', async ({ page }) => {
	test.slow();
	await page.goto('/');
	await playGame(page, 3);
});
