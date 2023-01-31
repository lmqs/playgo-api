import { LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'

export class DbLoadTournaments implements LoadTournaments {
  constructor (
    private readonly loadTournamentsRepository: LoadTournamentsRepository
  ) {}

  async load (): Promise<LoadTournamentsRepository.Result | undefined> {
    return await this.loadTournamentsRepository.loadAll()
  }
}
