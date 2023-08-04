import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'
import { DbUpdateTournament } from '@/data/usescases/tournament/db-update'

export const makeDbUpdateTournament = (): IUpdateTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository()
  return new DbUpdateTournament(tournamentPostgresRepository)
}
