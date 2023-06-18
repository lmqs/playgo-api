import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { IRemoveTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class RemoveTournamentSponsorController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeTournamentSponsor: IRemoveTournamentSponsor
  ) {}

  async handle (request: RemoveTournamentSponsorController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.removeTournamentSponsor.remove(request.id)
      return noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace RemoveTournamentSponsorController {
  export type Request = {
    id: string
  }
}
