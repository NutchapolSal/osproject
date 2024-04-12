import { expect, test } from '@playwright/test';

test('test-wipe-db is not available', async ({ page }) => {
	const res = await page.goto('/test-wipe-db');
	if (res) {
		expect(res.ok()).toBeFalsy();
	}
});

test('login/test-generate is not available', async ({ page }) => {
	const res = await page.goto('/login/test-generate');
	if (res) {
		expect(res.ok()).toBeFalsy();
	}
});

test('login/test-generate?key=asdf is not available', async ({ page }) => {
	const res = await page.goto('/login/test-generate?key=asdf');
	if (res) {
		expect(res.ok()).toBeFalsy();
	}
});

test('test-submit-score is not available', async ({ page }) => {
	const res = await page.goto('/test-submit-score');
	if (res) {
		expect(res.ok()).toBeFalsy();
	}
});
