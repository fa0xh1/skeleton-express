interface PermissionBaseDto {
  name: string
  description?: string
}
export type PermissionCreateDto = PermissionBaseDto
export type PermissionUpdateDto = PermissionBaseDto

export interface PermissionDto extends PermissionBaseDto {
  id: string
}

export interface RolePermissionCreateDto {
  role_id: string
  permission_id: string[]
}

export interface RolePermissionDto {
  role_id: string
  permission_id: string[]
}
