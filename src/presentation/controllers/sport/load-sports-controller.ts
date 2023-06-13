import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadSports } from '.'

export class LoadSportsController implements Controller {
  constructor (
    private readonly loadSports: LoadSports
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const sports = await this.loadSports.load()
      return sports?.length ? ok(sports) : noContent()
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}
