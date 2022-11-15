export interface UserCreateDto {
  email: string
  username: string
  password: string
}

export interface UserUpdateDto {
  email: string
  username: string
  password: string
}

interface Permission {
  id: string
  name: string
}

interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface UserDto {
  id: string
  email: string
  username: string
  roles?: Role[]
  permissions?: Permission[]
}

export interface AuthForLoginDto {
  username: string
  password: string
}
