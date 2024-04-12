import { dev } from '$app/environment';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';

export const GET = async ({ url, locals }) => {
	if (!dev) {
		return new Response(null, { status: 403 });
	}
	const keyString = url.searchParams.get('key');
	const key =
		keyString != null
			? {
					providerId: 'test',
					providerUserId: keyString,
					password: null
			  }
			: null;
	if (key) {
		try {
			const existingUser = await auth.useKey(key.providerId, key.providerUserId, key.password);
			const session = await auth.createSession({
				userId: existingUser.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
			return new Response(null, {
				status: 302,
				headers: {
					Location: `/`
				}
			});
		} catch (e) {
			if (!(e instanceof LuciaError && e.message == 'AUTH_INVALID_KEY_ID')) {
				console.log(e);
				return new Response(null, { status: 500 });
			}
		}
	}
	try {
		const user = await auth.createUser({
			key: key,
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
		return new Response(null, { status: 500 });
	}
};
