export interface PermissionCreateDto {
  name: string
  description: string
}

export interface PermissionDto {
  id: string
  name: string
  description: string
}

export interface RolePermissionCreateDto {
  role_id: string
  permission_id: string | string[]
}

export interface RolePermissionDto {
  id: string
  role_id: string
  permission_id: string | string[]
}
