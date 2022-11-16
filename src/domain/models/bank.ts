import { Entity } from './entity'

export interface UnmarshalledBank {
  id?: string
  name: string
}

export class Bank extends Entity<UnmarshalledBank> {
  private constructor(props: UnmarshalledBank) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledBank): Bank {
    const instance = new Bank(props)
    return instance
  }

  public unmarshal(): UnmarshalledBank {
    return {
      id: this.id,
      name: this.name,
    }
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this.props.name
  }
}
