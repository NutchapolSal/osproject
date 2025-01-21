import { test as base } from './svelteWaitFixture';
import type { Page } from '@playwright/test';

export const test = base.extend<{ user1Page: Page; user2Page: Page }>({
	user1Page: async ({ page }, use) => {
		await page.goto('/login/test-generate?key=user1');
		await use(page);
	},
	user2Page: async ({ page }, use) => {
		await page.goto('/login/test-generate?key=user2');
		await use(page);
	}
});
