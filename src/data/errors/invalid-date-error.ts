export class InvalidDateError extends Error {
  constructor (paramName: string) {
    super(`Data inválida: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
