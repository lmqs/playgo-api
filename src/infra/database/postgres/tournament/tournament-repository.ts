
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { AddTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentByIdRepository, LoadTournamentsRepository, RemoveTournamentRepository, UpdateTournamentRepository } from '@/data/protocols/db/tournament'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'

export class TournamentPostgresRepository extends BaseRepository<AddTournamentRepository.Params, AddTournamentRepository.Result>
  implements LoadTournamentByIdRepository, AddTournamentRepository, UpdateTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentsRepository, RemoveTournamentRepository {
  constructor (
    public readonly tableName: string = 'tournaments'
  ) {
    super(tableName)
  }

  async loadById (id: string): Promise<LoadTournamentByIdRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ id })
    return tournaments[0]
  }

  async add (data: AddTournament.Params): Promise<AddTournament.Result> {
    return await this.create(data)
  }

  async updateTournament (data: UpdateTournamentRepository.Params): Promise<UpdateTournamentRepository.Result> {
    return await this.update(data, { id: data.id })
  }

  async loadByDescription (description: string): Promise<LoadTournamentByDescriptionRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ description })
    return tournaments[0]
  }

  async loadAll (): Promise<LoadTournamentsRepository.Result | undefined> {
    return await this.findAll()
  }

  async remove (id: string): Promise<void> {
    await this.update({ deleted: true }, { id })
  }
}
