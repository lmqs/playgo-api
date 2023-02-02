import { EmailInUseError } from '../../../presentation/errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import { HttpResponse, AddAccount, Controller, Validation, Authentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, user, password, email, cityId, phoneNumber, photo } = request
      const account = await this.addAccount.add({ name, user, password, email, cityId, phoneNumber, photo })

      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({ user, password })

      return ok(authenticationModel)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
export namespace SignUpController {
  export type Request = {
    name: string
    user: string
    password: string
    passwordConfirmation: string
    email: string
    cityId: number
    phoneNumber: string
    photo?: string
  }
}
