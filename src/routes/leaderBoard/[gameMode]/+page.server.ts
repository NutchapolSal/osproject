import { getScores } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { reverseMapGameModes } from '../../gameModes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const gameMode = reverseMapGameModes(params.gameMode);
	if (gameMode == null) {
		throw error(404, 'unknown game mode');
	}
	return {
		scores: await getScores({ sortBy: 'highscore', gameMode: gameMode, limit: 100 }),
		gameMode: gameMode
	};
};
