import { getScores, getUserFromId, updateDisplayName } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { checkNullOrFile } from '$lib/checkNullOrFile';
import postgres from 'postgres';
import { auth } from '$lib/server/lucia';
import { GameModes } from '../../gameModes';

export const load: PageServerLoad = async ({ params, locals, url }) => {
	const [session, gotUser] = await Promise.all([locals.auth.validate(), getUserFromId(params.id)]);
	if (gotUser == null) {
		throw error(404, 'User not found');
	}
	const recents = await getScores({ limit: 10, userId: params.id, sortBy: 'recent' });
	const highscores = await Promise.all(
		Object.values(GameModes).map(async (gameMode) => ({
			mode: gameMode,
			scores: await getScores({ limit: 10, userId: params.id, sortBy: 'highscore', gameMode })
		}))
	);
	return {
		shownUser: gotUser,
		shownScores: { highscores, recents },
		loginInfo:
			session == null
				? null
				: {
						displayName: session.user.displayName,
						userId: session.user.userId,
						isSelf: session.user.userId === params.id
				  },
		url: {
			href: url.href,
			origin: url.origin
		}
	};
};

export const actions = {
	editName: async ({ request, locals, params }) => {
		const session = await locals.auth.validate();
		if (!session || params.id !== session.user.userId) {
			return fail(401, { error: 'Unauthorized', formName: undefined });
		}
		const data = await request.formData();

		try {
			const name = checkNullOrFile(data.get('displayName'), 'name').trim();
			if (name.length < 3) {
				return fail(400, {
					error: 'Display name must be at least 3 characters long',
					formName: name
				});
			}
			await updateDisplayName(params.id, name);
		} catch (error) {
			// https://github.com/porsager/postgres/issues/684
			if (error instanceof postgres.PostgresError) {
				return fail(400, { error: 'Bad Request', formName: undefined });
			}
		}
	},

	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId); // invalidate session
		locals.auth.setSession(null); // remove cookie
		throw redirect(302, '/');
	}
};
