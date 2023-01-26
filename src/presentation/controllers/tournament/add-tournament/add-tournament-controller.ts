import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { AddTournament, Controller, HttpRequest, HttpResponse, Validation } from './add-tournament-controller-protocols'
import { ParamInUseError } from '../../../errors'

export class AddTournamentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTournament: AddTournament
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { description, cityId, sportId, dtTournament, registrationLimit, registrationStartDate, registrationFinalDate } = httpRequest.body
      const tournament = await this.addTournament.add({ description, cityId, sportId, dtTournament, registrationLimit, registrationStartDate, registrationFinalDate })
      if (!tournament) {
        return forbidden(new ParamInUseError('description'))
      }
      return ok(tournament)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
