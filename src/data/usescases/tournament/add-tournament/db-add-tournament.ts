import {
  AddTournamentRepository, AddTournament, LoadTournamentByDescriptionRepository
} from './db-add-tournament-protocols'

export class DbAddTournament implements AddTournament {
  constructor (
    private readonly loadTournamentByDescriptionRepository: LoadTournamentByDescriptionRepository,
    private readonly addTournamentRepository: AddTournamentRepository
  ) {}

  async add (data: AddTournament.Params): Promise<AddTournament.Result | undefined> {
    const isValid = await this.loadTournamentByDescriptionRepository.loadByDescription(data.description)
    if (!isValid) {
      return await this.addTournamentRepository.add(data)
    }
  }
}
