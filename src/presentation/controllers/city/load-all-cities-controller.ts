import { ILoadAllCities } from '@/domain/usecases/city/load-cities'
import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LoadAllCitiesController implements Controller {
  constructor (
    private readonly loadCitiesUseCase: ILoadAllCities
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const cities = await this.loadCitiesUseCase.load()
      return cities.length ? ok(cities) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
