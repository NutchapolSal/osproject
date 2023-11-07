import { getLeaderboard } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { reverseMapGameModes } from '../../gameModes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const gameMode = reverseMapGameModes(params.gameMode);
	if (gameMode == null) {
		throw error(404, 'unknown game mode');
	}
	return {
		scores: await getLeaderboard(gameMode),
		gameMode: gameMode,
		url: {
			href: url.href,
			origin: url.origin
		}
	};
};
