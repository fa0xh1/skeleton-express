import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { BankService } from '../../../src/services/bank-service'
import { BankMapper } from '../../../src/dtos/mappers/bank-mapper'

@injectable()
export default class BankController {
  @inject(TYPES.BankService) private _bankService!: BankService

  public async listBanks(req: Request, res: Response): Promise<void> {
    const banks = await this._bankService.findAll()
    res.status(200).send(banks.map((val) => val))
  }

  public async findBankById(req: Request, res: Response): Promise<void> {
    const bank = await this._bankService.findById(req.params.id)
    res.status(200).send(bank)
  }

  public async createBank(req: Request, res: Response): Promise<void> {
    const bank = BankMapper.requestToDto(req.body)
    const bankService = await this._bankService.create(bank)
    res.status(200).send(bankService)
  }

  public async updateBank(req: Request, res: Response): Promise<void> {
    const bank = BankMapper.requestToDto(req.body)
    const bankService = await this._bankService.update(req.params.id, bank)
    res.status(200).send(bankService)
  }

  public async deleteBank(req: Request, res: Response): Promise<Response> {
    const bank = await this._bankService.delete(req.params.id)
    return res.status(200).send(bank)
  }
}
