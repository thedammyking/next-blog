import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';
import { UserRoles } from '@/types/db';

export const role = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  value: varchar('value').default(UserRoles.Reader),
  label: varchar('label').default('Reader'),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});
