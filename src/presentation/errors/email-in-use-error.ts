export class EmailInUseError extends Error {
  constructor () {
    super('This received email is already in use')
    this.stack = 'EmailInUseError'
  }
}
