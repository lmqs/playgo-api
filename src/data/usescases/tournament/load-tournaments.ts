import { LoadTournamentByIdRepository } from '@/data/protocols/db/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournaments-by-id'

export class DbLoadTournamentById implements LoadTournamentById {
  constructor (
    private readonly loadTournamentByIdRepository: LoadTournamentByIdRepository
  ) {}

  async load (id: string): Promise<LoadTournamentById.Result | undefined> {
    const tournament = await this.loadTournamentByIdRepository.loadById(id)
    if (tournament) {
      return tournament
    }
  }
}
