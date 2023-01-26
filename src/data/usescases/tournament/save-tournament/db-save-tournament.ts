import {
  AddTournamentRepository, LoadTournamentByIdRepository, SaveTournament, SaveTournamentModel, TournamentModel, UpdateTournamentRepository
} from './db-save-tournament-protocols'

export class DbSaveTournament implements SaveTournament {
  constructor (
    private readonly loadTournamentByIdRepository: LoadTournamentByIdRepository,
    private readonly addTournamentRepository: AddTournamentRepository,
    private readonly updateTournamentRepository: UpdateTournamentRepository
  ) {}

  async save (data: SaveTournamentModel): Promise<TournamentModel | undefined> {
    if (!data.id) {
      return await this.addTournamentRepository.add(data)
    }
    const tournament = await this.loadTournamentByIdRepository.loadById(data.id)
    if (tournament) {
      return await this.updateTournamentRepository.updateTournament(data as TournamentModel)
    }
  }
}
