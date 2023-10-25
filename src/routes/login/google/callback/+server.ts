import { auth, getGoogleAuth } from '$lib/server/lucia';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async ({ url, cookies, locals }) => {
	const storedState = cookies.get('google_oauth_state');
	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!storedState || !state || storedState !== state || !code) {
		return new Response(null, { status: 400 });
	}
	try {
		const res = await getGoogleAuth(url.origin).validateCallback(code);
		const getUser = async () => {
			const existingUser = await res.getExistingUser();
			if (existingUser) {
				return existingUser;
			}
			const user = await res.createUser({
				attributes: { display_name: res.googleUser.name, shadowbanned: false }
			});
			return user;
		};

		const user = await getUser();
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
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
