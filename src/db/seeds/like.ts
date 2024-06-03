import { eq } from 'drizzle-orm';

import type { db } from '@/db';
import * as schema from '@/db/schema';
import { UserRoles } from '@/types/db';

export default async function seed(db: db) {
  const reader = await db.query.user.findFirst({
    where: eq(schema.user.role, UserRoles.Reader)
  });

  const posts = await db.query.post.findMany();

  if (reader && posts.length > 0)
    await Promise.all(
      posts.map(async (post, index) => {
        const randomPostIndex = Math.ceil(Math.random() * 5);
        await Promise.all(
          Array(randomPostIndex * (index + 1))
            .fill(1)
            .map(
              async () =>
                await db.insert(schema.like).values({
                  readerId: reader.id,
                  postId: post.id
                })
            )
        );
      })
    );
}
