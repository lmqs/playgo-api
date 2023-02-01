import { CityModel } from '@/domain/models/city'

export interface LoadCitiesRepository {
  loadAll: () => Promise<LoadCitiesRepository.Result | undefined>
}

export namespace LoadCitiesRepository {
  export type Result = CityModel[]
}
