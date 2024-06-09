import { PgTimestampConfig } from 'drizzle-orm/pg-core';

export const TIMESTAMP_OPTIONS: PgTimestampConfig = { mode: 'string', withTimezone: true };
