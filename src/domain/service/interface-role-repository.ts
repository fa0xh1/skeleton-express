import { Role, UnmarshalledRole } from '../../domain/models/role'

export interface IRoleRepository {
  findAll(): Promise<Role[]>
  findById(id: string): Promise<Role>
  create(user: UnmarshalledRole): Promise<Role>
  update(id: string, user: UnmarshalledRole): Promise<Role>
  // delete(id: string): Promise<boolean>
}
