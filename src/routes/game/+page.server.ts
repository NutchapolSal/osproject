import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	gameSeed: crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
});
