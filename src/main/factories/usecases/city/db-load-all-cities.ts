import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { DbLoadCitiesUseCase } from '@/data/usescases/city'
import { ILoadAllCities } from '@/domain/usecases/city/load-cities'

export const makeDbLoadAllCities = (): ILoadAllCities => {
  const cityPostgresRepository = new CityPostgresRepository()
  return new DbLoadCitiesUseCase(cityPostgresRepository)
}
