import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'
import { badRequest, serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
export class LoadCategoriesByTournamentIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadCategoriesByTournamentId: ILoadCategoriesByTournamentId
  ) {}

  async handle (request: LoadCategoriesByTournamentIdController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) return badRequest(error)

      const { tournamentId, accountId } = request
      const categories = await this.loadCategoriesByTournamentId.load({ tournamentId, accountId })
      return categories.length ? ok(categories) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
export namespace LoadCategoriesByTournamentIdController {
  export type Request = {
    tournamentId: string
    accountId: string
  }
}
