
import { BaseRepository } from '../base-repository'
import { SaveTournamentModel } from '../../../../domain/usecases/tournament/save-tournament'
import { TournamentModel } from '../../../../domain/models/tournament'
import { AddTournamentRepository, LoadTournamentByIdRepository, UpdateTournamentRepository } from '../../../../data/protocols/db/tournament'

export class TournamentPostgresRepository extends BaseRepository<SaveTournamentModel, TournamentModel>
  implements LoadTournamentByIdRepository, AddTournamentRepository, UpdateTournamentRepository {
  constructor (
    public readonly tableName: string = 'tournaments'
  ) {
    super(tableName)
  }

  async loadById (id: string): Promise<TournamentModel | undefined> {
    const tournaments = await this.findGeneric({ id })
    return tournaments[0]
  }

  async add (data: SaveTournamentModel): Promise<TournamentModel> {
    return await this.create(data)
  }

  async updateTournament (data: TournamentModel): Promise<TournamentModel> {
    return await this.update(data, { id: data.id })
  }
}
