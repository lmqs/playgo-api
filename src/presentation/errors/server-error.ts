export class ServerError extends Error {
  constructor (error: Error) {
    super('Erro interno do servidor')
    this.message = error.message
    this.stack = error.stack
  }
}
