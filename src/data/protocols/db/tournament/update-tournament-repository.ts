import { TournamentModel } from '@/domain/models/tournament'

export interface UpdateTournamentRepository {
  updateTournament: (data: UpdateTournamentRepository.Params) => Promise<UpdateTournamentRepository.Result>
}

export namespace UpdateTournamentRepository {
  export type Params = {
    id: string
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament?: string
    dtFinalTournament?: string
    dtStartRegistration?: string
    dtFinalRegistration?: string
    otherInformation?: string
    deleted?: boolean
  }
  export type Result = TournamentModel
}
