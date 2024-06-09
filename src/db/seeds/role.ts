import type { db } from '@/db';
import * as schema from '@/db/schema';

import roles from './data/roles.json';

export default async function seed(db: db) {
  await Promise.all(
    roles.map(async role => {
      await db.insert(schema.role).values(role);
    })
  );
}
