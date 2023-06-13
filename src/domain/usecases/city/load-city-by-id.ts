import { CityModel } from '@/domain/models/city'

export interface ILoadCityById {
  load: (id: string) => Promise<ILoadCityById.Result | undefined>
}

export namespace ILoadCityById {
  export type Result = CityModel
}
