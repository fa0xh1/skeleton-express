export interface RoleCreateDto {
  name: string
  description?: string
}
export interface RoleDto {
  id: string
  name: string
  description?: string
}

export interface UserRoleCreateDto {
  user_id: string
  role_id: string[]
}

export interface UserRoleRemoveDto {
  user_id: string
  role_id: string[]
}

export interface UserRoleDto {
  user_id: string
  role_id: string[]
}
