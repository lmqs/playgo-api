export class EmailInUseError extends Error {
  constructor () {
    super('O e-mail recebido já está em uso')
    this.stack = 'EmailInUseError'
  }
}
