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
