import { badRequest, serverError, ok, noContent } from '../../../helpers/http/http-helper'
import { LoadCategoriesByTournamentId, Controller, HttpRequest, HttpResponse, Validation } from './load-category-by-tournamentId-controller-protocols'

export class LoadCategoriesByTournamentIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadCategoriesByTournamentId: LoadCategoriesByTournamentId
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.params)
      if (error) {
        return badRequest(error)
      }
      const { tournamentId } = httpRequest.params
      const categories = await this.loadCategoriesByTournamentId.load(tournamentId)
      return categories?.length ? ok(categories) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
