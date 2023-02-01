import { CityModel } from '@/domain/models/city'

export const mockCityModel = (): CityModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    codeIbge: 'any_code',
    stateId: 'any_stateId',
    gentilic: 'any_gentilic',
    deleted: true
  }
}

export const mocCitiesModel = (): CityModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name',
    codeIbge: 'any_code',
    stateId: 'any_stateId',
    gentilic: 'any_gentilic',
    deleted: true
  },
  {
    id: 'any_other_id',
    name: 'any_name',
    codeIbge: 'any_code',
    stateId: 'any_stateId',
    gentilic: 'any_gentilic',
    deleted: true
  }]
}
