import { LoadTournamentByIdRepository } from '@/data/protocols/db/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'

export class DbLoadTournamentById implements LoadTournamentById {
  constructor (
    private readonly loadTournamentByIdRepository: LoadTournamentByIdRepository
  ) {}

  async load (id: string): Promise<LoadTournamentById.Result | undefined> {
    return await this.loadTournamentByIdRepository.loadById(id)
  }
}
