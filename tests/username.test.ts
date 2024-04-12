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

test('changing name', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'save' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('save2');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'save2' })).toBeVisible();
	await page.getByRole('link').filter({ hasText: 'Leaderboard' }).click();
	await expect(page.getByRole('link', { name: 'save2' })).toBeVisible();

	await page.getByRole('link', { name: 'save2' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('save');
	await page.getByRole('button', { name: 'save' }).click();
});

test('cannot short name', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'save' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('a');
	await page.getByRole('button', { name: 'save' }).click();
	// error on form means textbox is still visible
	await expect(page.getByRole('textbox')).toBeVisible();
	await expect(page.getByRole('button', { name: 'edit' })).toBeHidden();
});

test('cannot empty name', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'save' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('');
	await page.getByRole('button', { name: 'save' }).click();
	// error on form means textbox is still visible
	await expect(page.getByRole('textbox')).toBeVisible();
	await expect(page.getByRole('button', { name: 'edit' })).toBeHidden();
});
