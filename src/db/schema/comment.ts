import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { post } from './post';

export const comment = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  readerId: uuid('reader_id'),
  postId: uuid('post_id').references(() => post.id),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const commentChild = pgTable('comment_children', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  parentId: uuid('parent_id').references(() => comment.id),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const commentRelations = relations(comment, ({ one, many }) => ({
  post: one(post, {
    fields: [comment.postId],
    references: [post.id]
  }),
  children: many(commentChild)
}));

export const commentChildRelations = relations(commentChild, ({ one }) => ({
  parent: one(comment, {
    fields: [commentChild.parentId],
    references: [comment.id]
  })
}));
