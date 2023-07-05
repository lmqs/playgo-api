import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { LoadSportByIdRepository } from '@/data/usescases/sport'
import { LoadTournaments } from '@/domain/usecases/tournament'
import { FormatDate } from '@/infra/gateways/date/date-handler'

export class DbLoadTournaments implements LoadTournaments {
  constructor (
    private readonly loadTournamentsRepository: LoadTournamentsRepository,
    private readonly loadCityByIdRepository: LoadCityByIdRepository,
    private readonly loadSportByIdRepository: LoadSportByIdRepository,
    private readonly dateHelper: FormatDate
  ) {}

  async load (): Promise<LoadTournaments.Result | undefined> {
    const tournaments = await this.loadTournamentsRepository.loadAll()
    const promisesCities = tournaments && await Promise.all(tournaments?.map(async (item) => {
      return await this.loadCityByIdRepository.loadById(item.cityId)
    }))

    const promisesSports = tournaments && await Promise.all(tournaments?.map(async (item) => {
      return await this.loadSportByIdRepository.loadById(item.sportId)
    }))
    const [cities, sports] = await Promise.all([promisesCities, promisesSports])
    return tournaments?.map((item, index) => {
      return {
        id: item.id,
        description: item.description,
        organization: item.organization,
        sport: sports?.[index],
        city: cities?.[index],
        dtStartTournament: item.dtStartTournament,
        dtFinalTournament: item.dtFinalTournament,
        dtStartRegistration: item.dtStartRegistration,
        dtFinalRegistration: item.dtFinalRegistration,
        dtFinalRegistrationFormatted: this.dateHelper.fullDate({ startDateString: item.dtFinalRegistration }) || item.dtFinalRegistration,
        dtStartRegistrationFormatted: this.dateHelper.fullDate({ startDateString: item.dtStartRegistration }) || item.dtStartRegistration,
        dtFinalTournamentFormatted: this.dateHelper.fullDate({ startDateString: item.dtFinalTournament }) || item.dtFinalTournament,
        dtStartTournamentFormatted: this.dateHelper.fullDate({ startDateString: item.dtStartTournament }) || item.dtStartTournament,
        otherInformation: item.otherInformation,
        deleted: item.deleted
      }
    })
  }
}
