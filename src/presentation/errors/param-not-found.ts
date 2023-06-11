export class ParamNotfound extends Error {
  constructor (paramName: string) {
    super(`${paramName} não encontrado na base de dados.`)
    this.name = 'ParamNotfound'
  }
}
