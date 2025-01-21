import type { PageServerLoad } from './$types';
import { GameModes, reverseMapGameModes } from '../gameModes';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ url, locals }) => {
	if (!dev) {
		throw error(404, 'Not Found');
	}
	const session = await locals.auth.validate();
	if (!session) {
		throw error(401, 'not logged in');
	}
	const gameMode = reverseMapGameModes(url.searchParams.get('mode') ?? GameModes.Normal);
	if (gameMode == null) {
		throw error(404, 'unknown game mode');
	}

	return {
		gameMode,
		gameSeed:
			url.searchParams.get('seed') ?? crypto.getRandomValues(new Uint32Array(1))[0].toString(36),
		timeStart: new Date().toISOString()
	};
};
