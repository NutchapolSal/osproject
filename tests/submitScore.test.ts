import { test } from './userFixture';
import { expect } from '@playwright/test';
import { playGame } from './autogame';

test.describe.configure({ mode: 'parallel' });

test('logged in can submit score', async ({ user2Page }) => {
	test.setTimeout(120000);
	const page = user2Page;
	await page.goto('/');
	await playGame(page, 5);

	await expect(page.getByRole('button', { name: 'submit score' })).toBeVisible();
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
});
test('guest cannot submit score', async ({ page }) => {
	test.setTimeout(120000);
	await page.goto('/');
	await playGame(page, 7);
	await expect(page.getByRole('button', { name: 'submit score' })).toBeHidden();
	await expect(page.getByRole('link').filter({ hasText: 'Sign Up with Google' })).toBeVisible();
});
