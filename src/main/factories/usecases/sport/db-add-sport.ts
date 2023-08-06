import { AddSport } from '@/domain/usecases/sport'
import { DbAddSport } from '@/data/usescases/sport/db-add-sport'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

export const makeDbAddSport = (): AddSport => {
  const sportPostgresRepository = new SportPostgresRepository()
  return new DbAddSport(sportPostgresRepository)
}
