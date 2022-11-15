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

export interface UserDto {
  id: string
  email: string
  username: string
  roles?: Record<string, string>[]
  permissions?: Record<string, string>[]
}

export interface AuthForLoginDto {
  username: string
  password: string
}
