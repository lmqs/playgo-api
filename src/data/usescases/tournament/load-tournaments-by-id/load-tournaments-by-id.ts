import { LoadTournamentById } from 'domain/usecases/tournament/load-tournaments-by-id'
import { LoadTournamentByIdRepository, TournamentModel } from './load-tournaments-by-id-protocols'

export class DbLoadTournamentById implements LoadTournamentById {
  constructor (
    private readonly loadTournamentByIdRepository: LoadTournamentByIdRepository
  ) {}

  async load (id: string): Promise<TournamentModel | undefined> {
    const tournament = await this.loadTournamentByIdRepository.loadById(id)
    if (tournament) {
      return tournament
    }
  }
}
