import { test } from './svelteWaitFixture';
import { expect, type Page } from '@playwright/test';
import { playGame } from './autogame';

test.describe.configure({ mode: 'parallel' });

async function playWithSeed(page: Page, seed: string) {
	await page.getByRole('button', { name: '◀️' }).click();
	await page.getByRole('button', { name: '🌱' }).focus();
	await page.getByPlaceholder('Enter seed...').fill(seed);
	return await playGame(page, 20, false);
}

test('no seed should generate different grids', async ({ page }) => {
	test.setTimeout(180000);
	await page.goto('/');
	const grids1 = await playGame(page, 20, false);
	await page.goto('/');
	const grids2 = await playGame(page, 20, false);
	expect(grids1).not.toEqual(grids2);
});

test('same seed should generate same grids', async ({ page }) => {
	test.setTimeout(180000);
	const seed = crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	await page.goto('/');
	const grids1 = await playWithSeed(page, seed);
	await page.goto('/');
	const grids2 = await playWithSeed(page, seed);
	expect(grids1).toEqual(grids2);
});

test('different seed should generate same grids', async ({ page }) => {
	test.setTimeout(180000);
	const seed1 = crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	const seed2 = crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	await page.goto('/');
	const grids1 = await playWithSeed(page, seed1);
	await page.goto('/');
	const grids2 = await playWithSeed(page, seed2);
	expect(grids1).not.toEqual(grids2);
});
