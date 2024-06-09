import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { comment } from './comment';
import { like } from './like';
import { savedPost } from './savedPost';

export const post = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  featuredImage: text('featured_image').notNull(),
  authorId: uuid('author_id'),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const postRelations = relations(post, ({ many }) => ({
  comments: many(comment),
  likes: many(like),
  savedPosts: many(savedPost)
}));
