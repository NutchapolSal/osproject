import { expect, test, type BrowserContext, type Browser } from '@playwright/test';

let user1Context: BrowserContext;
let user2Context: BrowserContext;

async function createUserContext(browser: Browser) {
	const userContext = await browser.newContext();
	const page1 = await userContext.newPage();
	await page1.goto('/login/test-generate');
	return userContext;
}

test.beforeAll(async ({ browser }) => {
	const page = await browser.newPage();
	await page.goto('/test-wipe-db');
	await Promise.all([
		createUserContext(browser).then((ctx) => {
			user1Context = ctx;
		}),
		createUserContext(browser).then((ctx) => {
			user2Context = ctx;
		})
	]);
});

test.afterAll(async () => {
	await Promise.all([user1Context.close(), user2Context.close()]);
});

test('change name', async () => {
	const page = await user1Context.newPage();
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('save');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
	await page.goto('/');
	await expect(page.getByRole('link', { name: 'save' })).toBeVisible();
});
test('change name 2', async () => {
	const page = await user2Context.newPage();
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('aomda');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
});
