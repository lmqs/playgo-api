import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { AddSport } from '@/domain/usecases/sport'

export class AddSportController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSport: AddSport
  ) {}

  async handle (request: AddSportController.Request): Promise<HttpResponse> {
    try {
      const error = await this.validation.validate(request)
      if (error) return badRequest(error)

      const sport = await this.addSport.add({ description: request.description })
      if (!sport) return forbidden(new ParamInUseError('description'))

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
