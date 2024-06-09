import { relations, sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { post } from './post';

export const savedPost = pgTable('saved_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  readerId: uuid('reader_id'),
  postId: uuid('post_id').references(() => post.id),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const savedPostRelations = relations(savedPost, ({ one }) => ({
  post: one(post, {
    fields: [savedPost.postId],
    references: [post.id]
  })
}));
