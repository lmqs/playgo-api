import { serverError, ok } from '../../../helpers/http/http-helper'
import { Controller, HttpResponse } from './add-tournament-controller-protocols'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'

export class LoadTournamentsController implements Controller {
  constructor (
    private readonly loadTournaments: LoadTournaments
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const tournaments = await this.loadTournaments.load()
      return ok(tournaments)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
