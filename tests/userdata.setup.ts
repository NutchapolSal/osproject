import { test } from './userFixture';
import { expect, type Page } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('change name', async ({ user1Page }) => {
	const page = user1Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('save');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
});
test('change name 2', async ({ user2Page }) => {
	const page = user2Page;
	await page.goto('/');
	await page.getByRole('link', { name: 'user' }).click();
	await page.getByRole('button', { name: 'edit' }).click();
	await page.getByRole('textbox').fill('aomda');
	await page.getByRole('button', { name: 'save' }).click();
	await expect(page.getByRole('textbox')).toBeHidden();
});

async function submitScore(
	page: Page,
	score: number,
	gameSeed: string | null,
	gameMode: string,
	timeStart: Date | null,
	gameDuration: number,
	gameVersion: string | null
) {
	const res = await page.goto(`/test-submit-score?mode=${gameMode}`);
	expect(res?.status()).not.toBe(404);

	await page.getByLabel('score').fill(score.toString());
	if (gameSeed != null) {
		await page.getByLabel('gameSeed').fill(gameSeed);
	}
	if (timeStart != null) {
		await page.getByLabel('timeStart').fill(timeStart.toISOString());
	}
	await page.getByLabel('gameDuration').fill(gameDuration.toString());
	if (gameVersion != null) {
		await page.getByLabel('gameVersion').fill(gameVersion);
	}
	await page.getByRole('button', { name: 'submit score' }).click();
	await expect(page.getByText('✅')).toBeVisible();
}
test('submit score 1-normal', async ({ user1Page }) => {
	const page = user1Page;
	await submitScore(
		page,
		200,
		null,
		'Normal',
		null,
		60000 + Math.floor(Math.random() * 30) * 1000,
		null
	);
});
test('submit score 2-normal', async ({ user2Page }) => {
	const page = user2Page;
	await submitScore(
		page,
		100,
		null,
		'Normal',
		null,
		60000 + Math.floor(Math.random() * 30) * 1000,
		null
	);
});
test('submit score 1-memory', async ({ user1Page }) => {
	const page = user1Page;
	await submitScore(
		page,
		120,
		null,
		'Memory',
		null,
		60000 + Math.floor(Math.random() * 30) * 1000,
		null
	);
});
test('submit score 2-memory', async ({ user2Page }) => {
	const page = user2Page;
	await submitScore(
		page,
		240,
		null,
		'Memory',
		null,
		60000 + Math.floor(Math.random() * 30) * 1000,
		null
	);
});
