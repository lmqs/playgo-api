import { CityModel } from '@/domain/models/city'

export interface LoadCityByIdRepository {
  loadById: (id: string) => Promise<LoadCityByIdRepository.Result | undefined>
}

export namespace LoadCityByIdRepository {
  export type Result = CityModel
}
