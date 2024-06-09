import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { post } from './post';

export const like = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  readerId: uuid('reader_id'),
  postId: uuid('post_id').references(() => post.id),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const likeRelations = relations(like, ({ one }) => ({
  post: one(post, {
    fields: [like.postId],
    references: [post.id]
  })
}));
