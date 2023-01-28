import { LoadTournamentByIdRepository, LoadTournamentById } from './load-tournaments-by-id-protocols'

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
