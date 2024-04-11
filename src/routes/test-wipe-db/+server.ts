import { dev } from '$app/environment';
import { wipeDatabase } from '$lib/server/db.js';
import { OAuthRequestError } from '@lucia-auth/oauth';

export const GET = async () => {
	if (!dev) {
		return new Response(null, { status: 403 });
	}
	try {
		await wipeDatabase();
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
