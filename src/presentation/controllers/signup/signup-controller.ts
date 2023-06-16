import { IAddAccount } from '@/domain/usecases/account/add-account'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { IAuthentication } from '@/domain/usecases/authentication/authentication'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccountUseCase: IAddAccount,
    private readonly validation: Validation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, gender, password, email, cityId, phoneNumber, photo, role, dateBirthday } = request
      await this.addAccountUseCase.add({ name, gender, password, email, cityId, phoneNumber, photo, role, dateBirthday })

      const authenticationModel = await this.authentication.auth({ email, password, role })

      return ok(authenticationModel)
    } catch (error: unknown) {
      if (error instanceof EmailInUseError) {
        return forbidden(error)
      }
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
    dateBirthday: string
    photo?: string
    role?: string
  }
}
