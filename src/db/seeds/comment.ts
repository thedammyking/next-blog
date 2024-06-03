import { eq } from 'drizzle-orm';
import type { db } from '@/db';
import * as schema from '@/db/schema';
import comments from './data/comments.json';
import { UserRoles } from '@/types/db';

export default async function seed(db: db) {
	const reader = await db.query.user.findFirst({
		where: eq(schema.user.role, UserRoles.Reader),
	});

	const posts = await db.query.post.findMany();

	if (reader && posts.length > 0)
		await Promise.all(
			comments.map(async (comment) => {
				const randomPostIndex = Math.floor(
					Math.random() * posts.length
				);
				const post = posts[randomPostIndex];
				const [insertedComment] = await db
					.insert(schema.comment)
					.values({
						...comment,
						readerId: reader.id,
						postId: post.id,
					})
					.returning();
				await Promise.all(
					comments.map(async (comment) => {
						await db.insert(schema.commentChild).values({
							...comment,
							parentId: insertedComment.id,
						});
					})
				);
			})
		);
}
