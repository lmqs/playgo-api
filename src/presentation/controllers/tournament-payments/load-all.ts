import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export class LoadAllTournamentPaymentsController implements Controller {
  constructor (
    private readonly useCase: ILoadAllTournamentPaymentsUseCase
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const payments = await this.useCase.loadAll()
      return payments.length ? ok(payments) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
