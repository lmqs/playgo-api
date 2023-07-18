import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'

export class UpdateTournamentController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateTournamentUseCase: IUpdateTournament
  ) {}

  async handle (request: UpdateTournamentController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const tournament = await this.updateTournamentUseCase.update(request)
      return ok(tournament)
    } catch (error: unknown) {
      if (error instanceof ParamInUseError) {
        return forbidden(error)
      }
      return serverError(error as Error)
    }
  }
}

export namespace UpdateTournamentController {
  export type Request = {
    id: string
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament?: string
    dtFinalTournament?: string
    dtStartRegistration?: string
    dtFinalRegistration?: string
    otherInformation?: string
  }
}
