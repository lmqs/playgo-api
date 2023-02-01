import { CityModel } from '@/domain/models/city'

export interface LoadCityById {
  load: (id: string) => Promise<LoadCityById.Result | undefined>
}

export namespace LoadCityById {
  export type Result = CityModel
}
