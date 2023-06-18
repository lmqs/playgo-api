import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ILoadByTournamentIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class LoadByTournamentIdTournamentSponsorUseCase implements ILoadByTournamentIdTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: ITournamentSponsorRepository
  ) {}

  async loadByTournamentId (id: string): Promise<ILoadByTournamentIdTournamentSponsor.Result> {
    return await this.tournamentSponsorRepository.loadByTournamentId(id)
  }
}
