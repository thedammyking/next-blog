import type { db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env/api';

import posts from './data/posts.json';

export default async function seed(db: db) {
  await Promise.all(
    posts.map(async (post, index) => {
      const [insertedPost] = await db
        .insert(schema.post)
        .values({
          ...post,
          authorId: env.SEED_EDITOR_ID
        })
        .returning();

      if ((index + 1) % 2)
        await db.insert(schema.savedPost).values({
          postId: insertedPost.id,
          readerId: env.SEED_READER_ID
        });
    })
  );
}
