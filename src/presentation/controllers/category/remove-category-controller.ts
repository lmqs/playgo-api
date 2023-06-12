import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class RemoveCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly removeCategory: IRemoveCategory
  ) {}

  async handle (request: RemoveCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.removeCategory.remove(request.id)
      return noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace RemoveCategoryController {
  export type Request = {
    id: string
  }
}
