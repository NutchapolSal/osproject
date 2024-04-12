import { expect, test as base, type Page } from '@playwright/test';

const test = base.extend<{ user1Page: Page; user2Page: Page }>({
	user1Page: async ({ page }, use) => {
		await page.goto('/login/test-generate?key=user1');
		await use(page);
	},
	user2Page: async ({ page }, use) => {
		await page.goto('/login/test-generate?key=user2');
		await use(page);
	}
});

test.describe.configure({ mode: 'parallel' });

test('edit available', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'save' }).click();
	await expect(page.getByRole('button', { name: 'edit' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'log out' })).toBeVisible();
});

test('no editing on other user', async ({ user1Page }) => {
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
