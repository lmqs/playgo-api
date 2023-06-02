export class ParamInUseError extends Error {
  constructor (field: string) {
    super(`O parâmetro recebido: ${field} está em uso`)
    this.stack = 'ParamInUseError'
  }
}
