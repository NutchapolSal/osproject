import { getScoresFromUserId, getUserFromId, updateDisplayName } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { checkNullOrFile } from '$lib/checkNullOrFile';
import postgres from 'postgres';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [session, gotUser, scores] = await Promise.all([
		locals.auth.validate(),
		getUserFromId(params.id),
		getScoresFromUserId(params.id)
	]);
	if (gotUser == null) {
		throw error(404, 'User not found');
	}
	return {
		shownUser: gotUser,
		shownScores: scores,
		loginInfo:
			session == null
				? null
				: {
						displayName: session.user.displayName,
						userId: session.user.userId,
						isSelf: session.user.userId === params.id
				  }
	};
};

export const actions = {
	editName: async ({ request, locals, params }) => {
		const session = await locals.auth.validate();
		if (!session || params.id !== session.user.userId) {
			return fail(401, { error: 'unauthorized' });
		}
		const data = await request.formData();

		try {
			const name = checkNullOrFile(data.get('displayName'), 'name');
			if (name.length < 3) {
				throw new TypeError('name too short');
			}
			await updateDisplayName(params.id, name);
		} catch (error) {
			// https://github.com/porsager/postgres/issues/684
			if (error instanceof TypeError) {
				return fail(400, { error: error.message });
			} else if (error instanceof postgres.PostgresError) {
				return fail(400, { error: 'bad request' });
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
