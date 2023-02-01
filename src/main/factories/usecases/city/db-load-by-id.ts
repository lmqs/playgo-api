import { LoadCityById } from '@/domain/usecases/city/load-city-by-id'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { DbLoadCityById } from '@/data/usescases/city'

export const makeDbLoadCityById = (): LoadCityById => {
  const cityPostgresRepository = new CityPostgresRepository()
  return new DbLoadCityById(cityPostgresRepository)
}
