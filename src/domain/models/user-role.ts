export interface UnmarshalledUserHasRole {
  user_id: string
  role_id: string[]
}

export class UserHasRole {
  protected props: UnmarshalledUserHasRole

  private constructor(props: UnmarshalledUserHasRole) {
    this.props = props
  }

  public static create(props: UnmarshalledUserHasRole): UserHasRole {
    const instance = new UserHasRole(props)
    return instance
  }

  public unmarshal(): UnmarshalledUserHasRole {
    return {
      user_id: this.user,
      role_id: this.role,
    }
  }

  get user(): string {
    return this.props.user_id
  }

  get role(): string[] {
    return this.props.role_id
  }
}
