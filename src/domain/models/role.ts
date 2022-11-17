import { Entity } from './entity'

export interface UnmarshalledRole {
  id?: string
  name: string
  description?: string
}

export class Role extends Entity<UnmarshalledRole> {
  private constructor(props: UnmarshalledRole) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledRole): Role {
    const instance = new Role(props)
    return instance
  }

  public unmarshal(): UnmarshalledRole {
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
