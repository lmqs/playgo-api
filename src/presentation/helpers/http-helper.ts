import { ServerError } from '../../presentation/errors'
import { HttpResponse } from '../../presentation/protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error : undefined)
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
