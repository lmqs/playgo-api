import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { IRemoveTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class RemoveTournamentSponsorUseCase implements IRemoveTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: ITournamentSponsorRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.tournamentSponsorRepository.remove(id)
  }
}
