import { SportModel } from '@/domain/models/sport'

export interface AddSportRepository {
  add: (data: AddSportRepository.Params) => Promise<AddSportRepository.Result >
}

export namespace AddSportRepository {
  export type Params = {
    description: string
  }
  export type Result = SportModel
}
