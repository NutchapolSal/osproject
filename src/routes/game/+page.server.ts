import { createNewScore } from '$lib/server/db';
import postgres from 'postgres';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async () => ({
	gameSeed: crypto.getRandomValues(new Uint32Array(1))[0].toString(36)
});

function checkIfFile(v: FormDataEntryValue | null) {
	if (v == null) {
		throw new TypeError();
	}
	if (v instanceof File) {
		throw new TypeError();
	}
	return v;
}

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
				score: parseInt(checkIfFile(data.get('score'))),
				gameSeed: checkIfFile(data.get('gameSeed')),
				gameMode: checkIfFile(data.get('gameMode')),
				timeStart: checkIfFile(data.get('timeStart')),
				gameDuration: parseInt(checkIfFile(data.get('gameDuration')))
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
