import { CityModel } from '@/domain/models/city'
import { SportModel } from '@/domain/models/sport'

export interface LoadTournaments {
  load: () => Promise<LoadTournaments.Result | undefined>
}

export namespace LoadTournaments {
  export type Result = Array<{ id: string
    description: string
    cityId?: CityModel
    sportId?: SportModel
    dtTournament: string
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean }>
}
