import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '

export class LoadRegistrationsByCategoryController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly useCase: ILoadRegistrationByCategoryId
  ) {}

  async handle (request: LoadRegistrationsByCategoryController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const result = await this.useCase.loadByCategoryId(request)
      return ok(result)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoadRegistrationsByCategoryController {
  export type Request = {
    categoryId: string
    accountId: string
  }
}
