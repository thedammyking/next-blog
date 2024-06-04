import { eq } from 'drizzle-orm';

import type { db } from '@/db';
import * as schema from '@/db/schema';
import { UserRoles } from '@/types/db';

import posts from './data/posts.json';

export default async function seed(db: db) {
  const editor = await db.query.user.findFirst({
    where: eq(schema.user.role, UserRoles.Editor)
  });

  const reader = await db.query.user.findFirst({
    where: eq(schema.user.role, UserRoles.Reader)
  });

  if (editor)
    await Promise.all(
      posts.map(async (post, index) => {
        const [insertedPost] = await db
          .insert(schema.post)
          .values({
            ...post,
            authorId: editor.id
          })
          .returning();

        if (reader && (index + 1) % 2)
          await db.insert(schema.savedPost).values({
            postId: insertedPost.id,
            readerId: reader.id
          });
      })
    );
}
