import { Entity } from './entity'

export interface UnmarshalledCompany {
  id?: string
  company_name: string
  company_code: string
  type: string
  email: string
  website: string
  status: string
}

export class Company extends Entity<UnmarshalledCompany> {
  private constructor(props: UnmarshalledCompany) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledCompany): Company {
    const instance = new Company(props)
    return instance
  }

  public unmarshal(): UnmarshalledCompany {
    return {
      id: this.id,
      company_name: this.company_name,
      company_code: this.company_code,
      type: this.type,
      email: this.email,
      website: this.website,
      status: this.status,
    }
  }

  get id(): string {
    return this._id
  }

  get company_name(): string {
    return this.props.company_name
  }

  get company_code(): string {
    return this.props.company_code
  }
  get type(): string {
    return this.props.type
  }

  get email(): string {
    return this.props.email
  }
  get website(): string {
    return this.props.website
  }

  get status(): string {
    return this.props.status
  }
}
