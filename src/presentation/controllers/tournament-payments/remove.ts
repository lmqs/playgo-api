import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { IRemoveTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export class RemoveTournamentPaymentsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly useCase: IRemoveTournamentPaymentsUseCase
  ) {}

  async handle (request: RemoveTournamentPaymentsController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) return badRequest(error)

      const payment = await this.useCase.remove(request.id)
      return ok(payment)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace RemoveTournamentPaymentsController {
  export type Request = {
    id: string
  }
}
