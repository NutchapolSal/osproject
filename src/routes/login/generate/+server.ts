import { dev } from '$app/environment';
import { auth } from '$lib/server/lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async ({ locals }) => {
	if (!dev) {
		return new Response(null, { status: 403 });
	}
	try {
		const user = await auth.createUser({
			key: null,
			attributes: { display_name: 'user', shadowbanned: false }
		});

		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: `/user/${user.userId}`
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuthRequestError) {
			return new Response(null, { status: 400 });
		}
		return new Response(null, { status: 500 });
	}
};
