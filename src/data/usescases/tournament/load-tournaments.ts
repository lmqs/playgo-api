import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { LoadSportByIdRepository } from '@/data/usescases/sport'

export class DbLoadTournaments implements LoadTournaments {
  constructor (
    private readonly loadTournamentsRepository: LoadTournamentsRepository,
    private readonly loadCityByIdRepository: LoadCityByIdRepository,
    private readonly loadSportByIdRepository: LoadSportByIdRepository
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
        sport: sports?.[index],
        city: cities?.[index],
        dtTournament: item.dtTournament,
        registrationStartDate: item.registrationStartDate,
        registrationFinalDate: item.registrationFinalDate,
        deleted: item.deleted
      }
    })
  }
}
