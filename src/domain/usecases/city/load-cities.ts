import { CityModel } from '@/domain/models/city'

export interface ILoadAllCities {
  load: () => Promise<ILoadAllCities.Result | undefined>
}

export namespace ILoadAllCities {
  export type Result = CityModel[]
}
