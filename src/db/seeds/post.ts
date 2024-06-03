import { eq } from 'drizzle-orm';
import type { db } from '@/db';
import * as schema from '@/db/schema';
import posts from './data/posts.json';
import { UserRoles } from '@/types/db';

export default async function seed(db: db) {
	const editor = await db.query.user.findFirst({
		where: eq(schema.user.role, UserRoles.Editor),
	});

	if (editor)
		await Promise.all(
			posts.map(
				async (post) =>
					await db.insert(schema.post).values({
						...post,
						authorId: editor.id,
					})
			)
		);
}
