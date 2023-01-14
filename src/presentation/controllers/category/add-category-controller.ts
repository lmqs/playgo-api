import { AddCategory } from './../../../domain/usecases/add-category'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-category-controller-protocols'

export class AddCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { description, tournamentId, numberAthletes } = httpRequest.body
      const category = await this.addCategory.add({ description, tournamentId, numberAthletes })
      return ok(category)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
