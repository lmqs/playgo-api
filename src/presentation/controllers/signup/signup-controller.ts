import { EmailInUseError } from '../../../presentation/errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import { HttpRequest, HttpResponse, AddAccount, Controller, Validation, Authentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, user, password, email, cityId, phoneNumber, photo } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        user,
        password,
        email,
        cityId,
        phoneNumber,
        photo
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({ user, password })

      return ok({ accessToken })
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
