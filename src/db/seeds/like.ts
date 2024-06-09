import type { db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env/api';

export default async function seed(db: db) {
  const posts = await db.query.post.findMany();

  if (posts.length > 0)
    await Promise.all(
      posts.map(async (post, index) => {
        const randomPostIndex = Math.ceil(Math.random() * posts.length);
        await Promise.all(
          Array(randomPostIndex * (index + 1))
            .fill(1)
            .map(
              async () =>
                await db.insert(schema.like).values({
                  readerId: env.SEED_READER_ID,
                  postId: post.id
                })
            )
        );
      })
    );
}
