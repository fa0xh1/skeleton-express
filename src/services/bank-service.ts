import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IBankRepository } from '../domain/service/interface-bank-repository'
import { BankCreateDto, BankDto } from '../../src/dtos/bank-dto'
import { BankMapper } from '../../src/dtos/mappers/bank-mapper'

@injectable()
export class BankService {
  constructor(
    @inject(TYPES.BankRepository) private _repository: IBankRepository,
  ) {}

  public async findAll(): Promise<BankDto[]> {
    const banks = await this._repository.findAll()
    const bankDtos = banks.map((bank) => BankMapper.domainToDto(bank))
    return bankDtos
  }

  public async findById(id: string): Promise<BankDto> {
    const bank = await this._repository.findById(id)
    const bankDto = BankMapper.domainToDto(bank)
    return bankDto
  }

  public async create(_bank: BankCreateDto): Promise<BankDto> {
    const bankDomain = BankMapper.dtoToDomain(_bank)
    const bank = await this._repository.create(bankDomain)
    const bankDto = BankMapper.domainToDto(bank)
    return bankDto
  }

  public async update(id: string, _bank: BankCreateDto): Promise<BankDto> {
    const bankDomain = BankMapper.dtoToDomain(_bank)
    const bank = await this._repository.update(id, bankDomain)
    const bankDto = BankMapper.domainToDto(bank)
    return bankDto
  }

  public async delete(id: string): Promise<boolean> {
    const bank = await this._repository.delete(id)
    return bank
  }
}
