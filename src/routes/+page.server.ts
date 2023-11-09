import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = await locals.auth.validate();
	const loginInfo =
		session == null
			? null
			: {
					displayName: session.user.displayName,
					userId: session.user.userId
			  };

	return {
		loginInfo,
		url: {
			href: url.href
		}
	};
};
