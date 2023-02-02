import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { RemoveTournament } from '@/domain/usecases/tournament'
import { DbRemoveTournament } from '@/data/usescases/tournament'

export const makeDbRemoveTournament = (): RemoveTournament => {
  const tournamentPostgresRepository = new TournamentPostgresRepository()
  return new DbRemoveTournament(tournamentPostgresRepository)
}
