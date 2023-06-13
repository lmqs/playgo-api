import { CityModel } from '@/domain/models/city'

export interface ICityRepository {
  loadAll: () => Promise<ICityRepository.LoadAllResult>
  loadById: (id: string) => Promise<ICityRepository.LoadByIdResult | undefined>
}

export namespace ICityRepository {
  export type LoadAllResult = CityModel[]
  export type LoadByIdResult = CityModel
}
