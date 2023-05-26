
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import {
  AddTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentByIdRepository, LoadTournamentsRepository, RemoveTournamentRepository, UpdateTournamentRepository, dataModelToDbModelMap
} from '@/data/protocols/db/tournament'
import { dbModelToDataModelMap, InputDbTournamentModel, OutputDbTournamentModel } from '@/data/models/tournament/db-tournament'
export class TournamentPostgresRepository extends BaseRepository<InputDbTournamentModel, OutputDbTournamentModel>
  implements LoadTournamentByIdRepository, AddTournamentRepository, UpdateTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentsRepository, RemoveTournamentRepository {
  constructor (
    public readonly tableName: string = 'tournaments'
  ) {
    super(tableName)
  }

  async add (data: AddTournamentRepository.Params): Promise<AddTournamentRepository.Result> {
    const result = await this.create(dataModelToDbModelMap(data))
    return dbModelToDataModelMap(result)
  }

  async updateTournament (data: UpdateTournamentRepository.Params): Promise<UpdateTournamentRepository.Result> {
    const result = await this.update(data, { id: data.id })
    return dbModelToDataModelMap(result)
  }

  async loadByDescription (description: string): Promise<LoadTournamentByDescriptionRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ description })
    return dbModelToDataModelMap(tournaments[0])
  }

  async loadById (id: string): Promise<LoadTournamentByIdRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ id })
    return dbModelToDataModelMap(tournaments[0])
  }

  async loadAll (): Promise<LoadTournamentsRepository.Result | undefined> {
    const tournaments = await this.findAll()
    return tournaments.map((tournament) => {
      return dbModelToDataModelMap(tournament)
    })
  }

  async remove (id: string): Promise<void> {
    await this.update({ deleted: true }, { id })
  }
}
