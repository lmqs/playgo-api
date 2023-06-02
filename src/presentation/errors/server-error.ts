export class ServerError extends Error {
  constructor (error: Error) {
    super('Internal server error')
    this.message = error.message
    this.stack = error.stack
  }
}
