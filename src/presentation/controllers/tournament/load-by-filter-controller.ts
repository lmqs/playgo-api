import { ILoadTournamentByFilter } from '@/domain/usecases/tournament/load-tournament-by-filter'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadTournamentByFilterController implements Controller {
  constructor (
    private readonly loadByFilter: ILoadTournamentByFilter
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const tournaments = await this.loadByFilter.loadDateFilter()
      return ok(tournaments)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
