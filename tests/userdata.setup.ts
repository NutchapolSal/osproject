import { expect, test as base, type Page } from '@playwright/test';
import { playGame } from './autogame';

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

test('change name', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('save');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'save' })).toBeVisible();
});
test('change name 2', async ({ user2Page }) => {
	const page = user2Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('aomda');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'aomda' })).toBeVisible();
});
test('submit score 1-normal', async ({ user1Page }) => {
	test.setTimeout(120000);
	const page = user1Page;
	await page.goto('/');
	await playGame(page, 20);
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
});
test('submit score 2-normal', async ({ user2Page }) => {
	test.setTimeout(120000);
	const page = user2Page;
	await page.goto('/');
	await playGame(page, 10);
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
});
test('submit score 1-memory', async ({ user1Page }) => {
	test.setTimeout(120000);
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('button', { name: 'Memory' }).click();
	await playGame(page, 12);
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
});
test('submit score 2-memory', async ({ user2Page }) => {
	test.setTimeout(120000);
	const page = user2Page;
	await page.goto('/');
	await page.getByRole('button', { name: 'Memory' }).click();
	await playGame(page, 24);
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
});
