import { dev } from '$app/environment';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { google } from '@lucia-auth/oauth/providers';
import { env } from '$env/dynamic/private';
import sql from './db';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: postgresAdapter(sql, {
		user: 'auth_user',
		key: 'user_key',
		session: 'user_session'
	}),
	getUserAttributes: (data) => {
		return {
			displayName: data.display_name,
			shadowbanned: data.shadowbanned
		};
	}
});

let lastOrigin = '';
let lastGoogleAuth = google(auth, {
	clientId: env.GOOGLE_AUTH_CLIENT_ID,
	clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
	redirectUri: `/login/google/callback`
});

export function getGoogleAuth(origin: string) {
	if (lastOrigin !== origin) {
		lastOrigin = origin;
		lastGoogleAuth = google(auth, {
			clientId: env.GOOGLE_AUTH_CLIENT_ID,
			clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
			redirectUri: `${origin}/login/google/callback`
		});
	}
	return lastGoogleAuth;
}

export type Auth = typeof auth;
