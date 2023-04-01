
import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { AddTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentByIdRepository, LoadTournamentsRepository, RemoveTournamentRepository, UpdateTournamentRepository } from '@/data/protocols/db/tournament'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'
import { TournamentModel } from '@/domain/models/tournament'
import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { LoadSportByIdRepository } from '@/data/protocols/db/sport'

export class TournamentPostgresRepository extends BaseRepository<AddTournamentRepository.Params, TournamentModel>
  implements LoadTournamentByIdRepository, AddTournamentRepository, UpdateTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentsRepository, RemoveTournamentRepository {
  constructor (
    public readonly loadCityByIdRepository: LoadCityByIdRepository,
    public readonly loadSportByIdRepository: LoadSportByIdRepository,
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
    const items = await this.findAll()
    const promisesCities = items.map(async (item) => {
      return await this.loadCityByIdRepository.loadById(item.cityId)
    })
    const promisesSports = items.map(async (item) => {
      return await this.loadSportByIdRepository.loadById(item.sportId)
    })

    const cities = await Promise.all(promisesCities)
    const sports = await Promise.all(promisesSports)

    return items.map((item, index) => {
      return {
        id: item.id,
        description: item.description,
        sportId: sports[index],
        dtTournament: item.dtTournament,
        registrationStartDate: item.registrationStartDate,
        registrationFinalDate: item.registrationFinalDate,
        deleted: item.deleted,
        cityId: cities[index]
      }
    })
  }

  async remove (id: string): Promise<void> {
    await this.update({ deleted: true }, { id })
  }
}
