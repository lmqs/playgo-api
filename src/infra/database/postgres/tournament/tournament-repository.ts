
import { BaseRepository } from '@/infra/service/base-repository-service'
import { InputDbTournamentModel, OutputDbTournamentModel, domainToDbAddModelMap } from '@/infra/model/db-tournament'
import { DateHandler } from '@/helpers/date-handler'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { TournamentRepoModel } from '@/data/models/tournament/db-tournament'
export class TournamentPostgresRepository extends BaseRepository<InputDbTournamentModel, OutputDbTournamentModel>
  implements ITournamentRepository {
  constructor (public readonly tableName: string = 'tournaments') {
    super(tableName)
  }

  async add (data: ITournamentRepository.AddParams): Promise<ITournamentRepository.Result> {
    const result = await this.create(domainToDbAddModelMap(data))
    return TournamentRepoModel.toModel(result)
  }

  async updateTournament (data: ITournamentRepository.UpdateParams): Promise<ITournamentRepository.Result> {
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
    return TournamentRepoModel.toModel(result)
  }

  async loadByDescription (description: string): Promise<ITournamentRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ description })
    return TournamentRepoModel.mapCollection(tournaments)[0]
  }

  async loadById (id: string): Promise<ITournamentRepository.Result | undefined> {
    const tournaments = await this.findGeneric({ id })
    return TournamentRepoModel.mapCollection(tournaments)[0]
  }

  async loadAll (): Promise<ITournamentRepository.Results | undefined> {
    const tournaments = await this.findAll()
    return TournamentRepoModel.mapCollection(tournaments)
  }

  async loadFilter ({ date, operator }: ITournamentRepository.LoadFilterParams): Promise<ITournamentRepository.Results> {
    const tournaments = await this.findWhereGeneric(`dt_final_tournament ${operator} ${date}`, 'dt_start_tournament desc')
    return TournamentRepoModel.mapCollection(tournaments)
  }

  async remove (id: string): Promise<void> {
    await this.update({ deleted: true }, { id })
  }
}
