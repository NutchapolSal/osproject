import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const sql = postgres({
	host: env.POSTGRES_HOSTNAME,
	database: env.POSTGRES_USER,
	username: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD
});

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

// sql`INSERT INTO "UnknownTable" ("id", "user_id", "score", "game_mode", "version_hash", "game_seed", "time_start", "game_duration") VALUES ('228d6902-8bb5-4f1d-bdb1-a5fd8e6cbcfe', 'e96l2qjsdch7an3', 2, 'normal', 'asdasd', '1234', '2023-10-25 19:11:39+00', 99);

// 		`;

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

export default sql;
