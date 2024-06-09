import type { db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env/api';

import comments from './data/comments.json';

export default async function seed(db: db) {
  const posts = await db.query.post.findMany();

  if (posts.length > 0)
    await Promise.all(
      comments.map(async comment => {
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        const post = posts[randomPostIndex];
        const [insertedComment] = await db
          .insert(schema.comment)
          .values({
            ...comment,
            readerId: env.SEED_READER_ID,
            postId: post.id
          })
          .returning();
        await Promise.all(
          comments.map(async comment => {
            await db.insert(schema.commentChild).values({
              ...comment,
              parentId: insertedComment.id
            });
          })
        );
      })
    );
}
