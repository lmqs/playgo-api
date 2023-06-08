export class AccessDeniedError extends Error {
  constructor () {
    super('Acesso negado')
    this.stack = 'AccessDeniedError'
  }
}
