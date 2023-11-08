import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	return {
		url: {
			href: url.href,
			origin: url.origin
		}
	};
};
