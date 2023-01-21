import { UnauthorizedError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { user, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ user, password })

      if (!accessToken) {
        return badRequest(new UnauthorizedError())
      }
      return ok({ accessToken })
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}