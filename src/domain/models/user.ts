import { Entity } from './entity'

interface Permission {
  id: string
  name: string
}

interface Role {
  id: string
  name: string
  permissions: Permission[]
}

export interface UnmarshalledUser {
  id?: string
  username: string
  email: string
  password: string
  roles?: Role[]
  permissions?: Permission[]
}

export class User extends Entity<UnmarshalledUser> {
  private constructor(props: UnmarshalledUser) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledUser): User {
    const instance = new User(props)
    return instance
  }

  public unmarshal(): UnmarshalledUser {
    return {
      id: this._id,
      username: this.username,
      email: this.email,
      password: this.password,
      roles: this.roles,
      permissions: this.permissions,
    }
  }

  get id(): string {
    return this._id
  }

  get username(): string {
    return this.props.username
  }

  get password(): string {
    return this.props.password
  }

  get email(): string {
    return this.props.email
  }

  get roles(): Role[] | undefined {
    return this.props.roles
  }

  get permissions(): Permission[] | undefined {
    return this.props.permissions
  }
}
