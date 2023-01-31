import { SportModel } from '@/domain/models/sport'

export interface LoadSportById {
  loadById: (id: string) => Promise<LoadSportById.Result | undefined>
}

export namespace LoadSportById {
  export type Result = SportModel
}
