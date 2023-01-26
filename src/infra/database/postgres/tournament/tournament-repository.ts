
import { BaseRepository } from '../base-repository'
import { TournamentModel } from '../../../../domain/models/tournament'
import { AddTournamentRepository, LoadTournamentByIdRepository, UpdateTournamentRepository } from '../../../../data/protocols/db/tournament'
import { AddTournamentModel } from '../../../../domain/usecases/tournament/save-tournament'

export class TournamentPostgresRepository extends BaseRepository<AddTournamentModel, TournamentModel>
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

  async add (data: AddTournamentModel): Promise<TournamentModel> {
    return await this.create(data)
  }

  async updateTournament (data: TournamentModel): Promise<TournamentModel> {
    return await this.update(data, { id: data.id })
  }
}
