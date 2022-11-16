import { BankCreateDto, BankDto } from '../bank-dto'
import { UnmarshalledBank, Bank } from '../../../src/domain/models/bank'
export class BankMapper {
  public static requestToDto(raw: bankRequest): BankCreateDto {
    return {
      name: raw.name,
    }
  }
  public static dtoToDomain(raw: BankCreateDto): UnmarshalledBank {
    return {
      name: raw.name,
    }
  }
  public static domainToDto(raw: Bank): BankDto {
    return {
      id: raw.id,
      name: raw.name,
    }
  }

  public static toDomain(raw: UnmarshalledBank): Bank {
    return Bank.create({
      id: raw.id,
      name: raw.name,
    })
  }

  public static toEntity(raw: BankCreateDto): Bank {
    return Bank.create({
      name: raw.name,
    })
  }
}

interface bankRequest {
  name: string
}
