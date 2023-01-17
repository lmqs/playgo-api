export class AccessDeniedError extends Error {
  constructor () {
    super('Access Denied')
    this.stack = 'AccessDeniedError'
  }
}
