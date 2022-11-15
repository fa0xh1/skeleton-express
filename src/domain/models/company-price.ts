import { Entity } from './entity'

export interface UnmarshalledCompanyPrice {
  id?: string
  company_id: string
  price_per_area: number
  discount: number
  final_price: number
}

export class CompanyPrice extends Entity<UnmarshalledCompanyPrice> {
  private constructor(props: UnmarshalledCompanyPrice) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledCompanyPrice): CompanyPrice {
    const instance = new CompanyPrice(props)
    return instance
  }

  public unmarshal(): UnmarshalledCompanyPrice {
    return {
      id: this.id,
      company_id: this.company_id,
      price_per_area: this.price_per_area,
      discount: this.discount,
      final_price: this.final_price,
    }
  }

  get id(): string {
    return this._id
  }

  get company_id(): string {
    return this.props.company_id
  }

  get price_per_area(): number {
    return this.props.price_per_area
  }
  get discount(): number {
    return this.props.discount
  }

  get final_price(): number {
    return this.props.final_price
  }
}
