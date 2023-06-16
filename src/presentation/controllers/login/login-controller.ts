import { IAuthentication } from '@/domain/usecases/authentication/authentication'
import { badRequest, serverError, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: IAuthentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(httpRequest)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest
      const authenticationModel = await this.authentication.auth({ email, password })

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
    email: string
    password: string
  }
}
