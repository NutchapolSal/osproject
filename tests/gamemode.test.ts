import { expect, test } from '@playwright/test';

test('normal mode can set up', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Normal' }).click();
    await page.getByRole('link').filter({ hasText: 'Start' }).click();
    await expect(page.locator('div.square.game.blanked')).toHaveCount(9);
    await expect(page.locator('div.square.game.blanked')).toHaveCount(0);
    await page.waitForTimeout(3000);
    await expect(page.locator('div.square.game.blanked')).toHaveCount(0);
});

test('memory mode can set up', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Memory' }).click();
    await page.getByRole('link').filter({ hasText: 'Start' }).click();
    await expect(page.locator('div.square.game.blanked')).toHaveCount(9);
    await expect(page.locator('div.square.game.blanked')).toHaveCount(0);
    await page.waitForTimeout(3000);
    await expect(page.locator('div.square.game.blanked')).toHaveCount(9);
});   