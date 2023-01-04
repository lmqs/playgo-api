export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.stack = 'UnauthorizedError'
  }
}
