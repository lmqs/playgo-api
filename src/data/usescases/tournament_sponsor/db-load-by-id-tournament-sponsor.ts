import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ILoadByIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class LoadByIdTournamentSponsorUseCase implements ILoadByIdTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: ITournamentSponsorRepository
  ) {}

  async loadById (id: string): Promise<ILoadByIdTournamentSponsor.Result | undefined> {
    return await this.tournamentSponsorRepository.loadById(id)
  }
}
