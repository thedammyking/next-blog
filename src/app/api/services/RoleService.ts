import { eq } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { CreateRoleData } from '@/types/services/role';

import { createRoleDataValidator, updateRoleDataValidator } from '../validators/services';

export class RoleService {
  async createRole(data: CreateRoleData) {
    await createRoleDataValidator.parse(data);
    const role = await db.insert(schema.role).values(data).returning();
    if (!role) throw new Error('Failed to create role');
    return role;
  }

  async getRoles() {
    const roles = await db.select().from(schema.role);
    if (!roles) throw new Error('No roles found');
    return roles;
  }

  async getRoleById(id: string) {
    const role = await db.query.role.findFirst({
      where: eq(schema.role.id, id)
    });
    if (!role) throw new Error('Role not found');
    return role;
  }

  async updateRole(id: string, data: Partial<CreateRoleData>) {
    await updateRoleDataValidator.parse(data);
    const role = await db.update(schema.role).set(data).where(eq(schema.role.id, id)).returning();
    if (!role) throw new Error('Failed to update role');
    return role;
  }

  async deleteRole(id: string) {
    const role = await db.delete(schema.role).where(eq(schema.role.id, id)).returning();
    if (!role) throw new Error('Failed to delete role');
    return role;
  }
}
