import { CityModel } from '@/domain/models/city'
import { SportModel } from '@/domain/models/sport'

export interface LoadTournaments {
  load: () => Promise<LoadTournaments.Result | undefined>
}
export namespace LoadTournaments {
  export type Result = Array<{
    id: string
    organization: string
    description: string
    city?: CityModel
    sport?: SportModel
    dtStartTournament: String
    dtFinalTournament: String
    dtStartRegistration: String
    dtFinalRegistration: String
    otherInformation?: string
    deleted?: boolean
    dtFinalTournamentFormatted: string
    dtStartTournamentFormatted: string
    dtStartRegistrationFormatted: string
    dtFinalRegistrationFormatted: string
  }>
}
