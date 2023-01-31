import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddSport, Controller, HttpResponse, Validation } from '.'
import { ParamInUseError } from '@/presentation/errors'

export class AddSportController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSport: AddSport
  ) {}

  async handle (request: AddSportController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { description } = request
      const sport = await this.addSport.add({ description })
      if (!sport) {
        return forbidden(new ParamInUseError('description'))
      }
      return ok(sport)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export namespace AddSportController {
  export type Request = {
    description: string
  }
}
