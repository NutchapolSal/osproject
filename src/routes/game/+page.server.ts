import { createNewScore } from '$lib/server/db';
import postgres from 'postgres';
import type { PageServerLoad } from './$types';
import { checkNullOrFile } from '$lib/checkNullOrFile';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, locals }) => {
	const session = await locals.auth.validate();
	const loginInfo =
		session == null
			? null
			: {
					displayName: session.user.displayName,
					userId: session.user.userId
			  };

	return {
		loginInfo,
		url: {
			href: url.href
		},
		gameSeed: crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
	};
};

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const session = await locals.auth.validate();
		if (!session) {
			return fail(401, { error: 'Not logged in' });
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
				return fail(400, { error: 'Bad Request' });
			}
		}
	}
};
