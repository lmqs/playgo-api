import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { LoadSportByIdRepository } from '@/data/usescases/sport'
import { LoadTournaments } from '@/domain/usecases/tournament'

export class DbLoadTournaments implements LoadTournaments {
  constructor (
    private readonly tournamentRepository: ITournamentRepository,
    private readonly loadCityByIdRepository: LoadCityByIdRepository,
    private readonly loadSportByIdRepository: LoadSportByIdRepository
  ) {}

  async load (): Promise<LoadTournaments.Result | undefined> {
    const tournaments = await this.tournamentRepository.loadAll()
    if (!tournaments) return undefined
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
        otherInformation: item.otherInformation,
        deleted: item.deleted
      }
    })
  }
}
