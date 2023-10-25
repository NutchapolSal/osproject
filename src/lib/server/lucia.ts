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

export const googleAuth = google(auth, {
	clientId: env.GOOGLE_AUTH_CLIENT_ID,
	clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
	redirectUri: `${env.WEBSERVER_HOSTNAME}/login/google/callback`
});

export type Auth = typeof auth;
