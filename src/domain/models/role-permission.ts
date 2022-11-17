export interface UnmarshalledRoleHasPermission {
  role_id: string
  permission_id: string[]
}

export class RoleHasPermission {
  protected props: UnmarshalledRoleHasPermission

  private constructor(props: UnmarshalledRoleHasPermission) {
    this.props = props
  }

  public static create(
    props: UnmarshalledRoleHasPermission,
  ): RoleHasPermission {
    const instance = new RoleHasPermission(props)
    return instance
  }

  public unmarshal(): UnmarshalledRoleHasPermission {
    return {
      role_id: this.role,
      permission_id: this.permission,
    }
  }

  get role(): string {
    return this.props.role_id
  }

  get permission(): string[] {
    return this.props.permission_id
  }
}
