import { createNewScore } from '$lib/server/db';
import postgres from 'postgres';
import type { PageServerLoad } from './$types';
import { checkNullOrFile } from '$lib/checkNullOrFile';
import { GameModes, reverseMapGameModes } from '../gameModes';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const gameMode = reverseMapGameModes(url.searchParams.get('mode') ?? GameModes.Normal);
	if (gameMode == null) {
		throw error(404, 'unknown game mode');
	}
	return {
		gameMode,
		gameSeed:
			url.searchParams.get('seed') ?? crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
	};
};

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return new Response(null, { status: 401 });
		}
		const data = await request.formData();

		try {
			const dbInput = {
				userId: session.user.userId,
				score: parseInt(checkNullOrFile(data.get('score'))),
				gameSeed: checkNullOrFile(data.get('gameSeed')),
				gameMode: checkNullOrFile(data.get('gameMode')),
				timeStart: checkNullOrFile(data.get('timeStart')),
				gameDuration: parseInt(checkNullOrFile(data.get('gameDuration')))
			};
			await createNewScore(dbInput);
		} catch (error) {
			// https://github.com/porsager/postgres/issues/684
			if (error instanceof TypeError || error instanceof postgres.PostgresError) {
				return new Response(null, { status: 400 });
			}
		}
	}
};
