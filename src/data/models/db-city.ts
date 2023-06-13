export type InputDbCityModel = {
  name: string
  codeIbge: string
  stateId: string
  area: string
  gentilic?: string
  deleted: boolean | false
}

export type OutputDbCityModel = {
  id: string
  name: string
  codeIbge: string
  stateId: string
  area: string
  gentilic?: string
  deleted: boolean | false
}
