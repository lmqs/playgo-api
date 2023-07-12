import { LoadTournamentById } from '@/domain/usecases/tournament'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadTournamentByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadByIdUseCase: LoadTournamentById
  ) {}

  async handle (request: LoadTournamentByIdController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tournament = await this.loadByIdUseCase.load(request.id)
      return ok(tournament)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadTournamentByIdController {
  export type Request = {
    id: string
  }
}
