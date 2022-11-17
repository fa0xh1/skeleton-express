import { Role, UnmarshalledRole } from '../../domain/models/role'

export interface IRoleRepository {
  findAll(): Promise<Role[]>
  findById(id: string): Promise<Role>
  create(role: UnmarshalledRole): Promise<Role>
  update(id: string, role: UnmarshalledRole): Promise<Role>
  // delete(id: string): Promise<boolean>
}
