import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { UserRoles } from '@/types/db';

import { comment } from './comment';
import { post } from './post';

export const user = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: varchar('role').default(UserRoles.Reader),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true })
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post),
  comments: many(comment)
}));
