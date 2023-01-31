import { badRequest, serverError, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { Authentication } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { user, password } = httpRequest
      const authenticationModel = await this.authentication.auth({ user, password })

      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    user: string
    password: string
  }
}
