import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { IPaymentMethodRepository } from '../domain/service/interface-payment-method-repository'
import {
  PaymentMethodCreateDto,
  PaymentMethodDto,
} from '../../src/dtos/payment-method-dto'
import { PaymentMethodMapper } from '../../src/dtos/mappers/payment-method-mapper'

@injectable()
export class PaymentMethodService {
  constructor(
    @inject(TYPES.PaymentMethodRepository)
    private _repository: IPaymentMethodRepository,
  ) {}

  public async findAll(): Promise<PaymentMethodDto[]> {
    const paymentMethods = await this._repository.findAll()
    const paymentMethodDtos = paymentMethods.map((paymentMethod) =>
      PaymentMethodMapper.domainToDto(paymentMethod),
    )
    return paymentMethodDtos
  }

  public async findById(id: string): Promise<PaymentMethodDto> {
    const paymentMethod = await this._repository.findById(id)
    const paymentMethodDto = PaymentMethodMapper.domainToDto(paymentMethod)
    return paymentMethodDto
  }

  public async create(
    _paymentMethod: PaymentMethodCreateDto,
  ): Promise<PaymentMethodDto> {
    const paymentMethodDomain = PaymentMethodMapper.dtoToDomain(_paymentMethod)
    const paymentMethod = await this._repository.create(paymentMethodDomain)
    const paymentMethodDto = PaymentMethodMapper.domainToDto(paymentMethod)
    return paymentMethodDto
  }

  public async update(
    id: string,
    _paymentMethod: PaymentMethodCreateDto,
  ): Promise<PaymentMethodDto> {
    const paymentMethodDomain = PaymentMethodMapper.dtoToDomain(_paymentMethod)
    const paymentMethod = await this._repository.update(id, paymentMethodDomain)
    const paymentMethodDto = PaymentMethodMapper.domainToDto(paymentMethod)
    return paymentMethodDto
  }

  public async delete(id: string): Promise<boolean> {
    const paymentMethod = await this._repository.delete(id)
    return paymentMethod
  }
}
