import { CompanyCreateDto, CompanyDto } from '../company-dto'
import {
  UnmarshalledCompany,
  Company,
} from '../../../src/domain/models/company'
export class CompanyMapper {
  public static requestToDto(raw: companyRequest): CompanyCreateDto {
    return {
      company_name: raw.company_name,
      company_code: raw.company_code,
      type: raw.type,
      email: raw.email,
      website: raw.website,
      status: raw.status,
    }
  }
  public static dtoToDomain(raw: CompanyCreateDto): UnmarshalledCompany {
    return {
      company_name: raw.company_name,
      company_code: raw.company_code,
      type: raw.type,
      email: raw.email,
      website: raw.website,
      status: raw.status,
    }
  }
  public static domainToDto(raw: Company): CompanyDto {
    return {
      id: raw.id,
      company_name: raw.company_name,
      company_code: raw.company_code,
      type: raw.type,
      email: raw.email,
      website: raw.website,
      status: raw.status,
    }
  }

  public static toDomain(raw: UnmarshalledCompany): Company {
    return Company.create({
      id: raw.id,
      company_name: raw.company_name,
      company_code: raw.company_code,
      type: raw.type,
      email: raw.email,
      website: raw.website,
      status: raw.status,
    })
  }

  public static toEntity(raw: CompanyCreateDto): Company {
    return Company.create({
      company_name: raw.company_name,
      company_code: raw.company_code,
      type: raw.type,
      email: raw.email,
      website: raw.website,
      status: raw.status,
    })
  }
}

interface companyRequest {
  company_name: string
  company_code: string
  type: string
  email: string
  website: string
  status: string
}
