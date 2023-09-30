import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'

export class AddRegistrationsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registration: IAddRegistrations
  ) {}

  async handle (request: AddRegistrationsController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const result = await this.registration.add(request)
      return ok(result)
    } catch (error: unknown) {
      if (error instanceof ParamInUseError) {
        return forbidden(error)
      }
      return serverError(error as Error)
    }
  }
}

export namespace AddRegistrationsController {
  export type Request = {
    categoryId: string
    registrationDate: string
    athletesId: string
    isPay?: boolean
    accountId: string
  }
}
