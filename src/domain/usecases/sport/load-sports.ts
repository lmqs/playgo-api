import { SportModel } from '@/domain/models/sport'

export interface LoadSports {
  load: () => Promise<LoadSports.Result>
}

export namespace LoadSports {
  export type Result = SportModel[]
}
