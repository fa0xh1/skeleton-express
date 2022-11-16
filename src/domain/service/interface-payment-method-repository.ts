import {
  PaymentMethod,
  UnmarshalledPaymentMethod,
} from '../../domain/models/payment-method'

export interface IPaymentMethodRepository {
  findAll(): Promise<PaymentMethod[]>
  findById(id: string): Promise<PaymentMethod>
  create(payment_method: UnmarshalledPaymentMethod): Promise<PaymentMethod>
  update(
    id: string,
    payment_method: UnmarshalledPaymentMethod,
  ): Promise<PaymentMethod>
  delete(id: string): Promise<boolean>
}
