import { uuid, text, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user';
import { post } from './post';
import { relations, sql } from 'drizzle-orm';

export const comment = pgTable('comments', {
	id: uuid('id').primaryKey().defaultRandom(),
	content: text('content').notNull(),
	readerId: uuid('reader_id').references(() => user.id),
	postId: uuid('post_id').references(() => post.id),
	createdAt: timestamp('created_at', {
		mode: 'string',
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
	deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true }),
});

export const commentChild = pgTable('comment_children', {
	id: uuid('id').primaryKey().defaultRandom(),
	content: text('content').notNull(),
	parentId: uuid('parent_id').references(() => comment.id),
	createdAt: timestamp('created_at', {
		mode: 'string',
		withTimezone: true,
	}).defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
		.defaultNow()
		.$onUpdate(() => sql`now()`),
	deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true }),
});

export const commentRelations = relations(comment, ({ one, many }) => ({
	post: one(post, {
		fields: [comment.postId],
		references: [post.id],
	}),
	reader: one(user, {
		fields: [comment.readerId],
		references: [user.id],
	}),
	children: many(commentChild),
}));

export const commentChildRelations = relations(commentChild, ({ one }) => ({
	parent: one(comment, {
		fields: [commentChild.parentId],
		references: [comment.id],
	}),
}));
