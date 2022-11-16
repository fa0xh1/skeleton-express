import { Bank, UnmarshalledBank } from '../../domain/models/bank'

export interface IBankRepository {
  findAll(): Promise<Bank[]>
  findById(id: string): Promise<Bank>
  create(bank: UnmarshalledBank): Promise<Bank>
  update(id: string, bank: UnmarshalledBank): Promise<Bank>
  delete(id: string): Promise<boolean>
}
