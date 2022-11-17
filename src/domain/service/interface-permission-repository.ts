import { Permission, UnmarshalledPermission } from '../models/permission'
export interface IPermissionRepository {
  findAll(): Promise<Permission[]>
  findById(id: string): Promise<Permission>
  create(permission: UnmarshalledPermission): Promise<Permission>
  update(id: string, permission: UnmarshalledPermission): Promise<Permission>
  // delete(id: string): Promise<boolean>
}
