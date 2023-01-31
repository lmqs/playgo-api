import { SportModel } from '@/domain/models/sport'

export interface LoadSportByDescriptionRepository {
  loadByDescription: (description: string) => Promise<LoadSportByDescriptionRepository.Result | undefined>
}

export namespace LoadSportByDescriptionRepository {
  export type Result = SportModel
}
