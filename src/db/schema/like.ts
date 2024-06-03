import { uuid, text, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user';
import { post } from './post';
import { relations } from 'drizzle-orm';

export const like = pgTable('likes', {
	id: uuid('id').primaryKey().defaultRandom(),
	readerId: uuid('reader_id'),
	postId: uuid('post_id'),
	createdAt: timestamp('created_at', {
		mode: 'string',
		withTimezone: true,
	}).defaultNow(),
	deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true }),
});

export const likeRelations = relations(like, ({ one }) => ({
	post: one(post, {
		fields: [like.postId],
		references: [post.id],
	}),
	reader: one(user, {
		fields: [like.readerId],
		references: [user.id],
	}),
}));
