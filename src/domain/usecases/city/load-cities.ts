import { CityModel } from '@/domain/models/city'

export interface ILoadAllCities {
  load: () => Promise<ILoadAllCities.Result>
}

export namespace ILoadAllCities {
  export type Result = CityModel[]
}
