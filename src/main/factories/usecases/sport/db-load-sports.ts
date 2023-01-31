
import { LoadSports } from '@/data/usescases/sport'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { DbLoadSports } from '@/data/usescases/sport/db-load-sports'

export const makeDbLoadSports = (): LoadSports => {
  const sportPostgresRepository = new SportPostgresRepository()
  return new DbLoadSports(sportPostgresRepository)
}
