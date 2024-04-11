import { expect, type Page } from '@playwright/test';

export async function playGame(page: Page, gridsDone: number) {
	await page.getByRole('link').filter({ hasText: 'Start' }).click();
	await expect(page.locator('div.square.game.blanked')).toHaveCount(9);
	await expect(page.locator('div.square.game.blanked')).toHaveCount(0);
	await expect(page.locator('button.square.game')).toHaveCount(9);
	for (let grids = 0; grids < gridsDone; grids++) {
		const squareStates = await page
			.locator('div.square.game')
			.evaluateAll((squares) => squares.map((square) => square.classList.contains('stateOn')));
		for (let i = 0; i < squareStates.length; i++) {
			if (squareStates[i]) {
				await page.locator('button.square.game').nth(i).click();
			}
		}
	}
	await expect(page.getByText('game over')).toBeVisible({ timeout: 120000 });
}
