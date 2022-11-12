import { Entity } from './entity'

export interface UnmarshalledUser {
  id?: string
  username: string
  email: string
  password: string
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
      // role_id: this.role,
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

  // get role(): number {
  //   return this.props.role_id
  // }
}
