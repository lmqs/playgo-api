import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'
import { ILoadAccountByName } from '@/domain/usecases/account/load-account-by-name'

export class LoadAccountByNameController implements Controller {
  constructor (
    private readonly loadAccountByNameUseCase: ILoadAccountByName,
    private readonly validation: Validation
  ) {}

  async handle (request: LoadAccountByNameController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const account = await this.loadAccountByNameUseCase.loadByName(request.name)
      return ok(account)
    } catch (error: unknown) {
      if (error instanceof EmailInUseError) {
        return forbidden(error)
      }
      return serverError(error as Error)
    }
  }
}
export namespace LoadAccountByNameController {
  export type Request = {
    name: string
  }
}
