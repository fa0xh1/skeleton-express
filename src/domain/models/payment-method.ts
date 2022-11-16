import { Entity } from './entity'

export interface UnmarshalledPaymentMethod {
  id?: string
  name: string
}

export class PaymentMethod extends Entity<UnmarshalledPaymentMethod> {
  private constructor(props: UnmarshalledPaymentMethod) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledPaymentMethod): PaymentMethod {
    const instance = new PaymentMethod(props)
    return instance
  }

  public unmarshal(): UnmarshalledPaymentMethod {
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
