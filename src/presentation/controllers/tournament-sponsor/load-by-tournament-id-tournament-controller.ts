import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadByTournamentIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
export class LoadByTournamentIdTournamentSponsorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly tournamentSponsorRepository: ILoadByTournamentIdTournamentSponsor
  ) {}

  async handle (request: LoadByTournamentIdTournamentSponsorController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const result = await this.tournamentSponsorRepository.loadByTournamentId(request.tournamentId)
      return ok(result)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadByTournamentIdTournamentSponsorController {
  export type Request = {
    tournamentId: string
  }
}
