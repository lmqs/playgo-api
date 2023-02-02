import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { AddTournament, Controller, HttpResponse, Validation } from './add-tournament-controller-protocols'
import { ParamInUseError } from '../../../errors'

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
      const { description, cityId, sportId, dtTournament, registrationStartDate, registrationFinalDate } = request
      const tournament = await this.addTournament.add({ description, cityId, sportId, dtTournament, registrationStartDate, registrationFinalDate })
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
    cityId: string
    sportId: string
    dtTournament: string
    registrationStartDate: string
    registrationFinalDate: string
  }
}
