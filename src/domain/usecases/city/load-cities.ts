import { CityModel } from '@/domain/models/city'

export interface LoadCities {
  load: () => Promise<LoadCities.Result | undefined>
}

export namespace LoadCities {
  export type Result = CityModel[]
}
