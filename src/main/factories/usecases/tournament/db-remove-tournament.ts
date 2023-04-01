import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { RemoveTournament } from '@/domain/usecases/tournament'
import { DbRemoveTournament } from '@/data/usescases/tournament'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

export const makeDbRemoveTournament = (): RemoveTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository(), new SportPostgresRepository())
  return new DbRemoveTournament(tournamentPostgresRepository)
}
