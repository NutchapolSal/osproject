import { getScoresFromUserId, getUserFromId } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const [session, gotUser, scores] = await Promise.all([
		locals.auth.validate(),
		getUserFromId(params.id),
		getScoresFromUserId(params.id)
	]);
	if (gotUser == null) {
		throw error(404, 'User not found');
	}
	return { shownUser: gotUser, shownScores: scores, displayName: session?.user?.displayName };
};
