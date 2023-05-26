import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'

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
