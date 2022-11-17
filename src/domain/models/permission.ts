import { Entity } from './entity'

export interface UnmarshalledPermission {
  id?: string
  name: string
  description?: string
}

export class Permission extends Entity<UnmarshalledPermission> {
  private constructor(props: UnmarshalledPermission) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledPermission): Permission {
    const instance = new Permission(props)
    return instance
  }

  public unmarshal(): UnmarshalledPermission {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }

  get description(): string | undefined {
    return this.props.description
  }
}
