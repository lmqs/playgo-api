import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadByTournamentIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class LoadByTournamentIdTournamentSponsorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeTournamentSponsor: ILoadByTournamentIdTournamentSponsor
  ) {}

  async handle (request: LoadByTournamentIdTournamentSponsorController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.removeTournamentSponsor.loadByTournamentId(request.id)
      return noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadByTournamentIdTournamentSponsorController {
  export type Request = {
    id: string
  }
}
