
import { BaseRepository } from '@/infra/service/base-repository-service'
import {
  AddTournamentRepository, LoadTournamentByDescriptionRepository, LoadTournamentByIdRepository, LoadTournamentsRepository,
  RemoveTournamentRepository, UpdateTournamentRepository, dataModelToDbModelMap
} from '@/data/protocols/db/tournament'
import { dbModelToDataModelMap, InputDbTournamentModel, OutputDbTournamentModel } from '@/data/models/tournament/db-tournament'
import { DateHandler } from '@/infra/gateways/date/date-handler'
export class TournamentPostgresRepository extends BaseRepository<InputDbTournamentModel, OutputDbTournamentModel>
  implements LoadTournamentByIdRepository, AddTournamentRepository, UpdateTournamentRepository, LoadTournamentByDescriptionRepository,
  LoadTournamentsRepository, RemoveTournamentRepository {
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
    const dateClass = new DateHandler()

    const dataMap = {
      id: data.id,
      description: data.description,
      organization: data.organization,
      city_id: data.cityId,
      sport_id: data.sportId,
      dt_start_tournament: data.dtStartTournament && data.dtStartTournament !== '' ? dateClass.format(data.dtStartTournament) : undefined,
      dt_final_tournament: data.dtFinalTournament && data.dtFinalTournament !== '' ? dateClass.format(data.dtFinalTournament) : undefined,
      dt_start_registration:
        data.dtStartRegistration && data.dtStartRegistration !== '' ? dateClass.format(data.dtStartRegistration) : undefined,
      dt_final_registration:
        data.dtFinalRegistration && data.dtFinalRegistration !== '' ? dateClass.format(data.dtFinalRegistration) : undefined,
      other_information: data.otherInformation
    }
    const result = await this.update(dataMap, { id: data.id })
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
