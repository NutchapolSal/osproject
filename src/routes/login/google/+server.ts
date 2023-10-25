import { dev } from '$app/environment';
import { getGoogleAuth } from '$lib/server/lucia';

export const GET = async ({ url, cookies }) => {
	const [authUrl, state] = await getGoogleAuth(url.origin).getAuthorizationUrl();

	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		secure: !dev,
		path: '/',
		maxAge: 60 * 60
	});
	return new Response(null, { status: 302, headers: { Location: authUrl.toString() } });
};
