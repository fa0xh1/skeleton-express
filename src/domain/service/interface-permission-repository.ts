import { Permission, UnmarshalledPermission } from '../models/permission'
export interface IPermissionRepository {
  findAll(): Promise<Permission[]>
  findById(id: string): Promise<Permission>
  create(user: UnmarshalledPermission): Promise<Permission>
  update(id: string, user: UnmarshalledPermission): Promise<Permission>
  // delete(id: string): Promise<boolean>
}
