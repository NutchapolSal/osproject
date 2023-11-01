import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';
import type { GameModes } from '../../routes/gameModes';

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
		id: user.id as string,
		displayName: user.display_name as string
	};
}
type ScoresQueryOptions = {
	limit?: number;
	sortBy?: 'highscore' | 'recent';
	userId?: string;
	gameMode?: GameModes;
};

export async function getScores(options: ScoresQueryOptions = {}) {
	const results: {
		score: number;
		gameMode: string;
		timeStart: Date;
		userId: string;
		displayName: string;
	}[] = [];
	const whereUserId = options.userId != null ? sql`score.user_id = ${options.userId}` : null;
	const whereGameMode =
		options.gameMode != null ? sql`score.game_mode = ${options.gameMode}` : null;
	const whereClause =
		whereUserId != null
			? sql`WHERE ${whereUserId}${whereGameMode != null ? sql` AND ${whereGameMode}` : sql``}`
			: whereGameMode != null
			? sql`WHERE ${whereGameMode}`
			: sql``;
	const sortByClause =
		options.sortBy === 'highscore'
			? sql`ORDER BY score DESC`
			: options.sortBy === 'recent'
			? sql`ORDER BY time_start DESC`
			: sql``;

	await sql`
	SELECT score.score, score.game_mode, score.time_start, score.user_id, auth_user.display_name FROM score
	INNER JOIN auth_user ON score.user_id = auth_user.id
	${whereClause}
	${sortByClause}
	${options.limit != null ? sql`LIMIT ${options.limit}` : sql``}
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

export async function getLeaderboard(gameMode: GameModes) {
	const results: {
		score: number;
		gameMode: string;
		timeStart: Date;
		userId: string;
		displayName: string;
	}[] = [];

	await sql`
	SELECT u.id user_id, u.display_name, s.id score_id, s.score, s.game_mode, s.version_hash, s.game_seed, s.time_start, s.game_duration
	FROM auth_user u
	CROSS JOIN LATERAL (
		SELECT *
		FROM score s
		WHERE s.user_id = u.id
		AND s.game_mode = ${gameMode}
		ORDER BY s.score DESC
		LIMIT 1
	) s
	ORDER BY s.score DESC
	LIMIT 100
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

export async function updateDisplayName(userId: string, displayName: string) {
	await sql`UPDATE auth_user SET display_name = ${displayName} WHERE id = ${userId}`;
}

export default sql;
