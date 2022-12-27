import { MissingParamError, InvalidParamError } from './../../errors'
import { badRequest } from './../../helpers/http-helper'
import { HttpRequest, HttpResponse, AddAccount, Controller } from './signup-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount

  constructor (addAccount: AddAccount) {
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'user', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { name, user, password, passwordConfirmation } = httpRequest.body
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'))
    }

    this.addAccount.add({
      name,
      user,
      password
    })
    return {
      statusCode: 200,
      body: 'ok'
    }
  }
}
