import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { post } from './post';
import { user } from './user';

export const like = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  readerId: uuid('reader_id'),
  postId: uuid('post_id'),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).defaultNow(),
  deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true })
});

export const likeRelations = relations(like, ({ one }) => ({
  post: one(post, {
    fields: [like.postId],
    references: [post.id]
  }),
  reader: one(user, {
    fields: [like.readerId],
    references: [user.id]
  })
}));
