import { Bank as EntityBank, UnmarshalledBank } from '../../domain/models/bank'
import { IBankRepository } from '../../domain/service/interface-bank-repository'
import { injectable } from 'inversify'
// import { ResourceNotFound } from '../../../src/libs/errors'
import { BankMapper } from '../../../src/dtos/mappers/bank-mapper'
import { Bank, BankInstance } from '../../../src/infrastructure/database/models'
import { BankCreateDto } from '../../../src/dtos/bank-dto'
@injectable()
export class BankSequelizeRepository implements IBankRepository {
  async findAll(): Promise<EntityBank[]> {
    const banks = await (<Promise<BankInstance[]>>Bank.findAll({
      attributes: ['id', 'name'],
    }))
    return banks.map((bank) => BankMapper.toDomain(bank))
  }

  async findById(id: string): Promise<EntityBank> {
    const bank = await Bank.findByPk<BankInstance>(id)
    if (!bank) {
      throw {
        statusCode: 404,
        message: 'Bank was not found',
      }
    }

    return BankMapper.toDomain(bank)
  }

  async create(bankDomain: UnmarshalledBank): Promise<EntityBank> {
    try {
      const bank = BankMapper.toEntity(bankDomain)
      const bankModel = await Bank.create(bank.unmarshal())
      const entity = BankMapper.toDomain(bankModel)
      return entity
    } catch (e) {
      throw {
        statusCode: 500,
        message: e,
      }
    }
  }

  async update(id: string, bankDto: BankCreateDto): Promise<EntityBank> {
    const bank = await Bank.findByPk(id)
    if (!bank) {
      throw {
        statusCode: 404,
        message: 'Bank was not found',
      }
    }
    await bank.update(bankDto)
    await bank.reload()
    const entity = BankMapper.toDomain(bank)

    return entity
  }

  async delete(id: string): Promise<boolean> {
    const bank = await Bank.findByPk(id)
    if (!bank) {
      throw {
        statusCode: 404,
        message: 'Your bank was not found',
      }
    }
    await bank.destroy()
    return true
  }
}
