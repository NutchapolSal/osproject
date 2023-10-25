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
	PRIMARY KEY ("id")
)`;

export default sql;
