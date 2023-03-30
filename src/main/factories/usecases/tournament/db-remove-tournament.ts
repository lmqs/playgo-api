import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { RemoveTournament } from '@/domain/usecases/tournament'
import { DbRemoveTournament } from '@/data/usescases/tournament'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'

export const makeDbRemoveTournament = (): RemoveTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository())
  return new DbRemoveTournament(tournamentPostgresRepository)
}
