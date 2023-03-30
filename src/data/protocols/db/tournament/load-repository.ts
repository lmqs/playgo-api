import { CityModel } from '@/domain/models/city'

export interface LoadTournamentsRepository {
  loadAll: () => Promise<LoadTournamentsRepository.Result | undefined>
}

export namespace LoadTournamentsRepository {
  export type Result = Array<{
    id: string
    description: string
    cityId?: CityModel
    sportId: string
    dtTournament: string
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean
  }>
}
