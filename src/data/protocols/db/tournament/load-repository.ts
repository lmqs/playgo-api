import { CityModel } from '@/domain/models/city'
import { SportModel } from '@/domain/models/sport'

export interface LoadTournamentsRepository {
  loadAll: () => Promise<LoadTournamentsRepository.Result | undefined>
}

export namespace LoadTournamentsRepository {
  export type Result = Array<{
    id: string
    description: string
    cityId?: CityModel
    sportId?: SportModel
    dtTournament: string
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean
  }>
}
