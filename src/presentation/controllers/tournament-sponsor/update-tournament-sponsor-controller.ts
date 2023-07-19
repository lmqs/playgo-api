import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { IUpdateTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class UpdateTournamentSponsorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateTournamentSponsor: IUpdateTournamentSponsor
  ) {}

  async handle (request: UpdateTournamentSponsorController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tournament = await this.updateTournamentSponsor.update(request)
      return ok(tournament)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace UpdateTournamentSponsorController {
  export type Request = {
    id: string
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
}
