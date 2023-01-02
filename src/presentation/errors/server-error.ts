export class ServerError extends Error {
  constructor (error?: Error) {
    super('Internal server error')
    this.stack = error?.stack
  }
}
