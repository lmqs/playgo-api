import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class AddTournamentSponsorUseCase implements IAddTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: ITournamentSponsorRepository
  ) {}

  async add (data: IAddTournamentSponsor.Params): Promise<IAddTournamentSponsor.Result> {
    return await this.tournamentSponsorRepository.add(data)
  }
}
