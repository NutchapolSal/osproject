import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const sql = postgres({
	host: env.POSTGRES_HOSTNAME,
	database: env.POSTGRES_USER,
	username: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD
});

if (!building) {
	await sql`
CREATE TABLE IF NOT EXISTS "auth_user" (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    shadowbanned BOOLEAN NOT NULL DEFAULT FALSE
)`;
	await sql`
CREATE TABLE IF NOT EXISTS "user_key" (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    hashed_password TEXT
)`;
	await sql`
CREATE TABLE IF NOT EXISTS "user_session" (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL
)`;

	await sql`
CREATE TABLE IF NOT EXISTS "score" (
	"id" UUID NOT NULL,
	"user_id" TEXT NOT NULL REFERENCES auth_user(id),
	"score" INTEGER NOT NULL,
	"game_mode" TEXT NOT NULL,
	"version_hash" TEXT NOT NULL,
	"game_seed" TEXT NOT NULL,
    "time_start" TIMESTAMPTZ NOT NULL,
	"game_duration" INTEGER NOT NULL,
	PRIMARY KEY ("id")
)`;
}

export async function createNewScore(v: {
	userId: string;
	score: number;
	gameMode: string;
	gameSeed: string;
	timeStart: string;
	gameDuration: number;
}) {
	const newObj = {
		id: crypto.randomUUID(),
		user_id: v.userId,
		score: v.score,
		game_mode: v.gameMode,
		version_hash: 'asdasd',
		game_seed: v.gameSeed,
		time_start: v.timeStart,
		game_duration: v.gameDuration
	};
	await sql`INSERT INTO "score"
    ${sql(newObj)}
    `;
}

export async function getUserFromId(id: string) {
	const user = (await sql`SELECT * FROM auth_user WHERE id = ${id}`)[0];
	if (user == null) {
		return null;
	}
	return {
		id: user.id,
		displayName: user.display_name
	};
}

export async function getScoresFromUserId(id: string) {
	const results: {
		score: number;
		gameMode: string;
		timeStart: Date;
	}[] = [];
	await sql`
	SELECT score.score, score.game_mode, score.time_start FROM score
	WHERE score.user_id = ${id}
	ORDER BY score DESC
	LIMIT 10
	`.forEach((score) => {
		results.push({
			score: score.score,
			gameMode: score.game_mode,
			timeStart: score.time_start
		});
	});

	return results;
}

export async function getLeaderboards() {
	const results: {
		score: number;
		gameMode: string;
		timeStart: Date;
		userId: string;
		displayName: string;
	}[] = [];
	await sql`
	SELECT score.score, score.game_mode, score.time_start, score.user_id, auth_user.display_name FROM score
	INNER JOIN auth_user ON score.user_id = auth_user.id
	ORDER BY score DESC
	`.forEach((score) => {
		results.push({
			score: score.score,
			gameMode: score.game_mode,
			timeStart: score.time_start,
			userId: score.user_id,
			displayName: score.display_name
		});
	});

	return results;
}

export default sql;
