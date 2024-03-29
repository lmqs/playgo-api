import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { RemoveTournament } from '@/domain/usecases/tournament/remove-tournament'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveTournamentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeTournament: RemoveTournament
  ) {}

  async handle (request: RemoveTournamentController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.removeTournament.remove(request.id)
      return noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace RemoveTournamentController {
  export type Request = {
    id: string
  }
}
