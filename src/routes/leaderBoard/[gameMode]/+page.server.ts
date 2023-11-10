import { getLeaderboard } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { reverseMapGameModes } from '../../gameModes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, locals }) => {
	const session = await locals.auth.validate();
	const shadowbanned = session?.user.shadowbanned ?? false;

	const gameMode = reverseMapGameModes(params.gameMode);
	if (gameMode == null) {
		throw error(404, 'unknown game mode');
	}
	return {
		scores: await getLeaderboard(gameMode, shadowbanned),
		gameMode: gameMode,
		url: {
			href: url.href
		}
	};
};
