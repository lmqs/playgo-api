import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ILoadAccountById } from '@/domain/usecases/account/load-account-by-id'

export class LoadAccountByTokenController implements Controller {
  constructor (
    private readonly loadUseCase: ILoadAccountById
  ) {}

  async handle (request: LoadAccountByTokenController.Request): Promise<HttpResponse> {
    try {
      const account = await this.loadUseCase.loadById(request.accountId)
      return ok(account)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
export namespace LoadAccountByTokenController {
  export type Request = {
    accountId: string
  }
}
