import { SportModel } from '@/domain/models/sport'

export interface LoadSports {
  load: () => Promise<LoadSports.Result | undefined>
}

export namespace LoadSports {
  export type Result = SportModel[]
}
