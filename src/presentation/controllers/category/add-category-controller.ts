import { AddCategory } from '@/domain/usecases/category/add-category'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '.'
import { ParamInUseError } from '@/presentation/errors'

export class AddCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCategory: AddCategory
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { description, tournamentId, numberAthletes } = request
      const category = await this.addCategory.add({ description, tournamentId, numberAthletes })
      if (!category) {
        return forbidden(new ParamInUseError('description'))
      }
      return ok(category)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace AddCategoryController {
  export type Request = {
    description: string
    tournamentId: string
    numberAthletes: string
  }
}
