import { MissingParamError, UnauthorizedError } from '../../../presentation/errors'
import { badRequest, serverError, ok } from '../../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['user', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { user, password } = httpRequest.body
      const accessToken = await this.authentication.auth(user, password)

      if (!accessToken) {
        return badRequest(new UnauthorizedError())
      }
      return ok({ accessToken })
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
