import { DbAddTournament } from '@/data/usescases/tournament/db-add-tournament'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

export const makeDbAddTournament = (): AddTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository(), new SportPostgresRepository())
  return new DbAddTournament(tournamentPostgresRepository, tournamentPostgresRepository)
}
