import { DbAddTournament } from '@/data/usescases/tournament/add-tournament/db-add-tournament'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'

export const makeDbAddTournament = (): AddTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository()
  return new DbAddTournament(tournamentPostgresRepository, tournamentPostgresRepository)
}
