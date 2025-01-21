import { test as userTest } from './userFixture';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

userTest('edit available', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'save' }).click();
	await expect(page.getByRole('button', { name: 'edit' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'log out' })).toBeVisible();
});

userTest('no editing on other user', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link').filter({ hasText: 'Leaderboard' }).click();
	await page.getByRole('link', { name: 'aomda' }).click();
	await expect(page.getByRole('button', { name: 'edit' })).toBeHidden();
	await expect(page.getByRole('button', { name: 'log out' })).toBeHidden();
});

test('404 on unknown user', async ({ page }) => {
	const response = await page.goto('/user/apdxapdxapdx');
	if (response) {
		expect(response.status()).toBe(404);
	}
});
