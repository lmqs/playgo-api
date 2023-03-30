import { CityModel } from '@/domain/models/city'

export interface LoadTournaments {
  load: () => Promise<LoadTournaments.Result | undefined>
}

export namespace LoadTournaments {
  export type Result = Array<{ id: string
    description: string
    cityId?: CityModel
    sportId: string
    dtTournament: string
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean }>
}
