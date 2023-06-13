import { DbLoadCityByIdUseCase } from '@/data/usescases/city'
import { ILoadCityById } from '@/domain/usecases/city/load-city-by-id'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'

export const makeDbLoadCityById = (): ILoadCityById => {
  const cityPostgresRepository = new CityPostgresRepository()
  return new DbLoadCityByIdUseCase(cityPostgresRepository)
}
