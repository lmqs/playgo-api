import { IUpdateAccount } from '@/domain/usecases/account/update-account'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'

export class UpdateAccountController implements Controller {
  constructor (
    private readonly updateAccountUseCase: IUpdateAccount,
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateAccountController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const account = await this.updateAccountUseCase.update(request)
      return ok(account)
    } catch (error: unknown) {
      if (error instanceof EmailInUseError) {
        return forbidden(error)
      }
      return serverError(error as Error)
    }
  }
}
export namespace UpdateAccountController {
  export type Request = {
    id: string
    name: string
    gender: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
    photo?: string
    role?: string
  }
}
