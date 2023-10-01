import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { IRemoveRegistrationUseCase } from '@/domain/usecases/registration/remove'

export class RemoveRegistrationsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly useCase: IRemoveRegistrationUseCase
  ) {}

  async handle (request: RemoveRegistrationsController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.useCase.remove(request.id)
      return noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace RemoveRegistrationsController {
  export type Request = {
    id: string
  }
}
