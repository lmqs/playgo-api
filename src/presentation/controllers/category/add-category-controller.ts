import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { IAddCategory } from '@/domain/usecases/category/add-category'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AddCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCategory: IAddCategory
  ) {}

  async handle (request: AddCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { description, tournamentId, numberAthletes } = request
      const category = await this.addCategory.add({ description, tournamentId, numberAthletes })

      return ok(category)
    } catch (error: unknown) {
      if (error instanceof ParamInUseError) {
        return forbidden(error)
      }
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
