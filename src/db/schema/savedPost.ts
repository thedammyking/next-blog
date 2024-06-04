import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { post } from './post';
import { user } from './user';

export const savedPost = pgTable('saved_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  readerId: uuid('reader_id'),
  postId: uuid('post_id'),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true })
});

export const savedPostRelations = relations(savedPost, ({ one }) => ({
  post: one(post, {
    fields: [savedPost.postId],
    references: [post.id]
  }),
  reader: one(user, {
    fields: [savedPost.readerId],
    references: [user.id]
  })
}));
