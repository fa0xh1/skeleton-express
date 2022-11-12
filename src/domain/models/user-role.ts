import { Entity } from './entity'

export interface UnmarshalledUserHasRole {
  id?: string
  user_id: string
  role_id: string | string[]
}

export class UserHasRole extends Entity<UnmarshalledUserHasRole> {
  private constructor(props: UnmarshalledUserHasRole) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledUserHasRole): UserHasRole {
    const instance = new UserHasRole(props)
    return instance
  }

  public unmarshal(): UnmarshalledUserHasRole {
    return {
      id: this.id,
      user_id: this.user,
      role_id: this.role,
    }
  }

  get id(): string {
    return this._id
  }

  get user(): string {
    return this.props.user_id
  }

  get role(): string | string[] {
    return this.props.role_id
  }
}
