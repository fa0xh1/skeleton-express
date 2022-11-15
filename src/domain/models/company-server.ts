import { Entity } from './entity'

export interface UnmarshalledCompanyServer {
  id?: string
  company_id: string
  rest_api_url: string
  web_admin_url: string
  status: number
}

export class CompanyServer extends Entity<UnmarshalledCompanyServer> {
  private constructor(props: UnmarshalledCompanyServer) {
    const { id, ...data } = props
    super(data, id)
  }

  public static create(props: UnmarshalledCompanyServer): CompanyServer {
    const instance = new CompanyServer(props)
    return instance
  }

  public unmarshal(): UnmarshalledCompanyServer {
    return {
      id: this.id,
      company_id: this.company_id,
      rest_api_url: this.rest_api_url,
      web_admin_url: this.web_admin_url,
      status: this.status,
    }
  }

  get id(): string {
    return this._id
  }

  get company_id(): string {
    return this.props.company_id
  }

  get rest_api_url(): string {
    return this.props.rest_api_url
  }
  get web_admin_url(): string {
    return this.props.web_admin_url
  }

  get status(): number {
    return this.props.status
  }
}
