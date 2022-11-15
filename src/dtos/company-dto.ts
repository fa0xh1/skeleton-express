export interface CompanyCreateDto {
  id?: string
  company_name: string
  company_code: string
  type: string
  email: string
  website: string
  status: string
}
export interface CompanyDto {
  id?: string
  company_name: string
  company_code: string
  type: string
  email: string
  website: string
  status: string
}

// export interface UserCompanyCreateDto {
//   user_id: string
//   company_id: string | string[]
// }

// export interface UserCompanyRemoveDto {
//   user_id: string
//   company_id: string | string[]
// }

// //relasi
// export interface UserCompanyDto {
//   id: string
//   user_id: string
//   company_id: string | string[]
// }
