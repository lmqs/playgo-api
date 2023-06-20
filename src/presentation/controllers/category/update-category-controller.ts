import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { IUpdateCategory } from '@/domain/usecases/category/update-category'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateCategory: IUpdateCategory
  ) {}

  async handle (request: UpdateCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const category = await this.updateCategory.update(request)

      return ok(category)
    } catch (error: unknown) {
      if (error instanceof ParamInUseError) {
        return forbidden(error)
      }
      return serverError(error as Error)
    }
  }
}

export namespace UpdateCategoryController {
  export type Request = {
    id: string
    description: string
    tournamentId: string
    numberAthletes: string
    numberAthletesRegistration: string
  }
}
