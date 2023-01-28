import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { Controller, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository,
    private readonly statusServerErrorCode: number = 500
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === this.statusServerErrorCode) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
