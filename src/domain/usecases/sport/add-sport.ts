import { SportModel } from '@/domain/models/sport'

export interface AddSport {
  add: (account: AddSport.Params) => Promise<AddSport.Result | undefined>
}

export namespace AddSport {
  export type Params = {
    description: string
  }
  export type Result = SportModel
}
