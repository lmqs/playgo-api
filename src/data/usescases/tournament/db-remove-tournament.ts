import { RemoveTournamentRepository } from '@/data/protocols/db/tournament'
import { RemoveTournament } from '@/domain/usecases/tournament/remove-tournament'

export class DbRemoveTournament implements RemoveTournament {
  constructor (
    private readonly removeTournamentRepository: RemoveTournamentRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.removeTournamentRepository.remove(id)
  }
}
