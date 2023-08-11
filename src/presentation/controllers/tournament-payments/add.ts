import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { IAddTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export class AddTournamentPaymentsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly useCase: IAddTournamentPaymentsUseCase
  ) {}

  async handle (request: AddTournamentPaymentsController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const payment = await this.useCase.add(request)
      return ok(payment)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace AddTournamentPaymentsController {
  export type Request = {
    tournamentId: string
    value: string
    indexPayment: string
  }
}
