import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export class DbAddTournamentSponsor implements IAddTournamentSponsor {
  constructor (
    private readonly tournamentSponsorRepository: IAddTournamentSponsor
  ) {}

  async add (data: IAddTournamentSponsor.Params): Promise<IAddTournamentSponsor.Result> {
    return await this.tournamentSponsorRepository.add(data)
  }
}
