import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { IUpdateTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class UpdateTournamentSponsorUseCase implements IUpdateTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: ITournamentSponsorRepository
  ) {}

  async update (data: IUpdateTournamentSponsor.Params): Promise<IUpdateTournamentSponsor.Result> {
    return await this.tournamentSponsorRepository.updateSponsor(data)
  }
}
