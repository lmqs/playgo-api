import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'

export class DbLoadTournamentById implements LoadTournamentById {
  constructor (
    private readonly tournamentRepository: ITournamentRepository
  ) {}

  async load (id: string): Promise<LoadTournamentById.Result | undefined> {
    return await this.tournamentRepository.loadById(id)
  }
}
