import { SportModel } from '@/domain/models/sport'

export interface LoadSportByIdRepository {
  loadById: (id: string) => Promise<LoadSportByIdRepository.Result | undefined>
}

export namespace LoadSportByIdRepository {
  export type Result = SportModel
}
