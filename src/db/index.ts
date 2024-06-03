import env from '@/env/api';
import 'dotenv/config';

import * as schema from '@/db/schema';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const connection = postgres(env.DATABASE_URL, {
	prepare: false,
});

const db = drizzle(connection, {
	schema,
	logger: true,
});

export type db = typeof db;

export default db;
