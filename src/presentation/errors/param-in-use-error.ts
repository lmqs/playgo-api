export class ParamInUseError extends Error {
  constructor (field: string) {
    super(`This received ${field} is already in use`)
    this.stack = 'ParamInUseError'
  }
}
