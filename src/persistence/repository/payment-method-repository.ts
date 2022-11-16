import {
  PaymentMethod as EntityPaymentMethod,
  UnmarshalledPaymentMethod,
} from '../../domain/models/payment-method'
import { IPaymentMethodRepository } from '../../domain/service/interface-payment-method-repository'
import { injectable } from 'inversify'
// import { ResourceNotFound } from '../../../src/libs/errors'
import { PaymentMethodMapper } from '../../../src/dtos/mappers/payment-method-mapper'
import {
  PaymentMethod,
  PaymentMethodInstance,
} from '../../../src/infrastructure/database/models'
import { PaymentMethodCreateDto } from '../../../src/dtos/payment-method-dto'
@injectable()
export class PaymentMethodSequelizeRepository
  implements IPaymentMethodRepository
{
  async findAll(): Promise<EntityPaymentMethod[]> {
    const paymentMethods = await (<Promise<PaymentMethodInstance[]>>(
      PaymentMethod.findAll({
        attributes: ['id', 'name'],
      })
    ))
    return paymentMethods.map((paymentMethod) =>
      PaymentMethodMapper.toDomain(paymentMethod),
    )
  }

  async findById(id: string): Promise<EntityPaymentMethod> {
    const paymentMethod = await PaymentMethod.findByPk<PaymentMethodInstance>(
      id,
    )
    if (!paymentMethod) {
      throw {
        statusCode: 404,
        message: 'PaymentMethod was not found',
      }
    }

    return PaymentMethodMapper.toDomain(paymentMethod)
  }

  async create(
    paymentMethodDomain: UnmarshalledPaymentMethod,
  ): Promise<EntityPaymentMethod> {
    try {
      const paymentMethod = PaymentMethodMapper.toEntity(paymentMethodDomain)
      const paymentMethodModel = await PaymentMethod.create(
        paymentMethod.unmarshal(),
      )
      const entity = PaymentMethodMapper.toDomain(paymentMethodModel)
      return entity
    } catch (e) {
      throw {
        statusCode: 500,
        message: e,
      }
    }
  }

  async update(
    id: string,
    paymentMethodDto: PaymentMethodCreateDto,
  ): Promise<EntityPaymentMethod> {
    const paymentMethod = await PaymentMethod.findByPk(id)
    if (!paymentMethod) {
      throw {
        statusCode: 404,
        message: 'PaymentMethod was not found',
      }
    }
    await paymentMethod.update(paymentMethodDto)
    await paymentMethod.reload()
    const entity = PaymentMethodMapper.toDomain(paymentMethod)

    return entity
  }

  async delete(id: string): Promise<boolean> {
    const paymentMethod = await PaymentMethod.findByPk(id)
    if (!paymentMethod) {
      throw {
        statusCode: 404,
        message: 'Your paymentMethod was not found',
      }
    }
    await paymentMethod.destroy()
    return true
  }
}
