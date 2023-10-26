import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session == null) {
		return { loginInfo: null };
	}
	return {
		loginInfo: {
			displayName: session.user.displayName,
			userId: session.user.userId
		}
	};
};
