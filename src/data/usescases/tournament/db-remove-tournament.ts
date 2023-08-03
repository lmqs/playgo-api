import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { RemoveTournament } from '@/domain/usecases/tournament/remove-tournament'

export class DbRemoveTournament implements RemoveTournament {
  constructor (
    private readonly removeTournamentRepository: ITournamentRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.removeTournamentRepository.remove(id)
  }
}
