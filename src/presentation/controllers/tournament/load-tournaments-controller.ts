import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadTournamentsController implements Controller {
  constructor (
    private readonly loadTournaments: LoadTournaments
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const tournaments = await this.loadTournaments.load()
      return tournaments.length ? ok(tournaments) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
