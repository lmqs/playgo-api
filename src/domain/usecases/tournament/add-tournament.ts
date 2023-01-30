import { TournamentModel } from '@/domain/models/tournament'

export interface AddTournament {
  add: (data: AddTournament.Params) => Promise<AddTournament.Result | undefined>
}

export namespace AddTournament {
  export type Params = {
    description: string
    cityId: string
    sportId: string
    dtTournament: string
    registrationLimit?: number
    registrationStartDate: string
    registrationFinalDate: string
    deleted?: boolean
  }
  export type Result = TournamentModel
}
