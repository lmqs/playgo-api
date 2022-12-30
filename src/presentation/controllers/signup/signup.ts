import { MissingParamError, InvalidParamError } from './../../errors'
import { badRequest, serverError, ok } from './../../helpers/http-helper'
import { HttpRequest, HttpResponse, AddAccount, Controller } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount

  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'user', 'password', 'passwordConfirmation', 'email', 'cityId', 'phoneNumber']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, user, password, passwordConfirmation, email, cityId, phoneNumber, photo } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

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
    } catch (error) {
      return serverError()
    }
  }
}
