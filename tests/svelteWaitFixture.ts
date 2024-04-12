import { test as base } from '@playwright/test';

export const test = base.extend({
	// https://github.com/sveltejs/kit/blob/ed8970ef74d804d198fc92f44e66578743f9b5b9/packages/kit/test/utils.js#L99C8-L119C4
	page: async ({ page, javaScriptEnabled }, use) => {
		// automatically wait for kit started event after navigation functions if js is enabled
		const page_navigation_functions = ['goto', 'goBack', 'reload'];
		page_navigation_functions.forEach((fn) => {
			// @ts-expect-error copied from sveltekit tests
			const page_fn = page[fn];
			if (!page_fn) {
				throw new Error(`function does not exist on page: ${fn}`);
			}
			// @ts-expect-error copied from sveltekit tests
			page[fn] = async function (...args) {
				const res = await page_fn.call(page, ...args);
				if (javaScriptEnabled && args[1]?.wait_for_started !== false) {
					await page.waitForSelector('body.started', { timeout: 15000 });
				}
				return res;
			};
		});

		await use(page);
	}
});
