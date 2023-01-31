import { SportModel } from '@/domain/models/sport'

export interface LoadSportByDescription {
  loadByDescription: (description: string) => Promise<LoadSportByDescription.Result | undefined>
}

export namespace LoadSportByDescription {
  export type Result = SportModel
}
