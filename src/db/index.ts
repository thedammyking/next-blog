import apiEnv from '@/data/apiEnv';
import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const client = postgres(apiEnv.DATABASE_URL, { prepare: false });

export default drizzle(client);
