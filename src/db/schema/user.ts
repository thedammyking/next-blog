import { relations, sql } from 'drizzle-orm';
import { uuid, text, pgTable, pgEnum, timestamp } from 'drizzle-orm/pg-core';
import { post } from './post';
import { comment } from './comment';
import { UserRoles } from '@/types/db';

export const roleEnum = pgEnum('role', [
	UserRoles.SuperAdmin,
	UserRoles.Editor,
	UserRoles.Reader,
]);

export const user = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	email: text('email').unique().notNull(),
	password: text('password').notNull(),
	role: roleEnum('role').default(UserRoles.Reader),
	createdAt: timestamp('created_at', {
		mode: 'string',
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
	deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true }),
});

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
	comments: many(comment),
}));
