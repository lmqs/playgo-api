import { TournamentModel } from '@/domain/models/tournament'

export interface AddTournamentRepository {
  add: (data: AddTournamentRepository.Params) => Promise<AddTournamentRepository.Result>
}

export namespace AddTournamentRepository {
  export type Params = {
    description: string
    cityId: string
    sportId: string
    dtTournament: string
    registrationLimit: string
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean
  }
  export type Result = TournamentModel
}
