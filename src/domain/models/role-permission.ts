import { Entity } from './entity'

export interface UnmarshalledRoleHasPermission {
  id?: string
  role_id: string
  permission_id: string | string[]
}

export class RoleHasPermission extends Entity<UnmarshalledRoleHasPermission> {
  private constructor(props: UnmarshalledRoleHasPermission) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(
    props: UnmarshalledRoleHasPermission,
  ): RoleHasPermission {
    const instance = new RoleHasPermission(props)
    return instance
  }

  public unmarshal(): UnmarshalledRoleHasPermission {
    return {
      id: this.id,
      role_id: this.role,
      permission_id: this.permission,
    }
  }

  get id(): string {
    return this._id
  }

  get role(): string {
    return this.props.role_id
  }

  get permission(): string | string[] {
    return this.props.permission_id
  }
}
