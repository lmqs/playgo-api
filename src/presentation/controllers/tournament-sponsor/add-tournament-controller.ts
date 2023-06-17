import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class AddTournamentSponsorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTournamentSponsor: IAddTournamentSponsor
  ) {}

  async handle (request: AddTournamentSponsorController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tournament = await this.addTournamentSponsor.add(request)
      return ok(tournament)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace AddTournamentSponsorController {
  export type Request = {
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
}
