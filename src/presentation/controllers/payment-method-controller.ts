import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { PaymentMethodService } from '../../../src/services/payment-method-service'
import { PaymentMethodMapper } from '../../../src/dtos/mappers/payment-method-mapper'

@injectable()
export default class PaymentMethodController {
  @inject(TYPES.PaymentMethodService)
  private _paymentMethodService!: PaymentMethodService

  public async listPaymentMethods(req: Request, res: Response): Promise<void> {
    const paymentMethods = await this._paymentMethodService.findAll()
    res.status(200).send(paymentMethods.map((val) => val))
  }

  public async findPaymentMethodById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const paymentMethod = await this._paymentMethodService.findById(
      req.params.id,
    )
    res.status(200).send(paymentMethod)
  }

  public async createPaymentMethod(req: Request, res: Response): Promise<void> {
    const paymentMethod = PaymentMethodMapper.requestToDto(req.body)
    const paymentMethodService = await this._paymentMethodService.create(
      paymentMethod,
    )
    res.status(200).send(paymentMethodService)
  }

  public async updatePaymentMethod(req: Request, res: Response): Promise<void> {
    const paymentMethod = PaymentMethodMapper.requestToDto(req.body)
    const paymentMethodService = await this._paymentMethodService.update(
      req.params.id,
      paymentMethod,
    )
    res.status(200).send(paymentMethodService)
  }

  public async deletePaymentMethod(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const paymentMethod = await this._paymentMethodService.delete(req.params.id)
    return res.status(200).send(paymentMethod)
  }
}
