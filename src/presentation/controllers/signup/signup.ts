import { badRequest, serverError, ok } from './../../helpers/http-helper'
import { HttpRequest, HttpResponse, AddAccount, Controller, Validation } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

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
      return ok(account)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
