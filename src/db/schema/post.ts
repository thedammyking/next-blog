import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { comment } from './comment';
import { like } from './like';
import { user } from './user';

export const post = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  featuredImage: text('featured_image').notNull(),
  authorId: uuid('author_id').references(() => user.id),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true
  }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', { mode: 'string', withTimezone: true })
});

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id]
  }),
  comments: many(comment),
  likes: many(like)
}));
