import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import type { db } from '@/db';
import * as schema from '@/db/schema';
import users from './data/users.json';

export default async function seed(db: db) {
	await Promise.all(
		users.map(
			async (user) =>
				await db.insert(schema.user).values({
					...user,
					password: await bcrypt.hashSync(user.password, 10),
				})
		)
	);
}
