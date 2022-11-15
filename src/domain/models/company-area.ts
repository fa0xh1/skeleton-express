import { Entity } from './entity'

export interface UnmarshalledCompanyArea {
  id?: string
  company_id: string
  name: number
  pit_total: number
  location: string
  description: string
}

export class CompanyArea extends Entity<UnmarshalledCompanyArea> {
  private constructor(props: UnmarshalledCompanyArea) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledCompanyArea): CompanyArea {
    const instance = new CompanyArea(props)
    return instance
  }

  public unmarshal(): UnmarshalledCompanyArea {
    return {
      id: this.id,
      company_id: this.company_id,
      name: this.name,
      pit_total: this.pit_total,
      location: this.location,
      description: this.description,
    }
  }

  get id(): string {
    return this._id
  }

  get company_id(): string {
    return this.props.company_id
  }

  get name(): number {
    return this.props.name
  }
  get pit_total(): number {
    return this.props.pit_total
  }

  get location(): string {
    return this.props.location
  }
  get description(): string {
    return this.props.description
  }
}
