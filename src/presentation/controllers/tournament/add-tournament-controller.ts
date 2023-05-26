import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddTournament } from '@/domain/usecases/tournament'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/presentation/errors'

export class AddTournamentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTournament: AddTournament
  ) {}

  async handle (request: AddTournamentController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tournament = await this.addTournament.add(request)
      if (!tournament) {
        return forbidden(new ParamInUseError('description'))
      }
      return ok(tournament)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace AddTournamentController {
  export type Request = {
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament: String
    dtFinalTournament: String
    dtStartRegistration: String
    dtFinalRegistration: String
    otherInformation?: string
  }
}