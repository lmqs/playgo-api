import { AddAccount } from '@/domain/usecases/account/add-account'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases/authentication/authentication'

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
      const { name, gender, password, email, cityId, phoneNumber, photo, role } = request
      const result = await this.addAccount.add({ name, gender, password, email, cityId, phoneNumber, photo, role })

      if (result instanceof Error) {
        return forbidden(result)
      }
      const authenticationModel = await this.authentication.auth({ email, password })

      return ok(authenticationModel)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
export namespace SignUpController {
  export type Request = {
    name: string
    password: string
    gender: string
    email: string
    cityId: number
    phoneNumber: string
    photo?: string
    role?: string
  }
}
