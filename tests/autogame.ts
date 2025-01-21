import { expect, type Page } from '@playwright/test';

export async function playGame(
	page: Page,
	gridsDone: number,
	{ waitForGameOver = true, collectData = false } = {}
) {
	await page.getByRole('link').filter({ hasText: 'Start' }).click();
	await expect(page.locator('div.square.game.blanked')).toHaveCount(9);
	await expect(page.locator('div.square.game.blanked')).toHaveCount(0);
	await expect(page.locator('button.square.game')).toHaveCount(9);
	const gridStates = [];
	for (let grids = 0; grids < gridsDone; grids++) {
		const squareStates = await page
			.locator('div.square.game')
			.evaluateAll((squares) => squares.map((square) => square.classList.contains('stateOn')));
		if (collectData) {
			const playerGridRotate = await page
				.locator('div.spinny:has(button.square.game)')
				.evaluate((spinny) => spinny.style.rotate);
			const targetGridRotate = await page
				.locator('div.spinny:has(div.square.game)')
				.evaluate((spinny) => spinny.style.rotate);
			gridStates.push({
				squareStates,
				playerGridRotate,
				targetGridRotate
			});
		}
		for (let i = 0; i < squareStates.length; i++) {
			if (squareStates[i]) {
				await page.locator('button.square.game').nth(i).click();
			}
		}
	}
	if (waitForGameOver) {
		await expect(page.getByText('game over')).toBeVisible({ timeout: 120000 });
	}
	return gridStates;
}
