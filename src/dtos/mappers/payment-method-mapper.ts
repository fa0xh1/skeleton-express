import { PaymentMethodCreateDto, PaymentMethodDto } from '../payment-method-dto'
import {
  UnmarshalledPaymentMethod,
  PaymentMethod,
} from '../../../src/domain/models/payment-method'
export class PaymentMethodMapper {
  public static requestToDto(
    raw: paymentMethodRequest,
  ): PaymentMethodCreateDto {
    return {
      name: raw.name,
    }
  }
  public static dtoToDomain(
    raw: PaymentMethodCreateDto,
  ): UnmarshalledPaymentMethod {
    return {
      name: raw.name,
    }
  }
  public static domainToDto(raw: PaymentMethod): PaymentMethodDto {
    return {
      id: raw.id,
      name: raw.name,
    }
  }

  public static toDomain(raw: UnmarshalledPaymentMethod): PaymentMethod {
    return PaymentMethod.create({
      id: raw.id,
      name: raw.name,
    })
  }

  public static toEntity(raw: PaymentMethodCreateDto): PaymentMethod {
    return PaymentMethod.create({
      name: raw.name,
    })
  }
}

interface paymentMethodRequest {
  name: string
}
