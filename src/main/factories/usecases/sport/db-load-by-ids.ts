
import { LoadSportById } from '@/data/usescases/sport'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { DbLoadSportById } from '@/data/usescases/sport/db-load-sport-by-id'

export const makeDbLoadSportById = (): LoadSportById => {
  const sportPostgresRepository = new SportPostgresRepository()
  return new DbLoadSportById(sportPostgresRepository)
}
