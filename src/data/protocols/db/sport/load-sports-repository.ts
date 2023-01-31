import { SportModel } from '@/domain/models/sport'

export interface LoadSportsRepository {
  loadAll: () => Promise<LoadSportsRepository.Result | undefined>
}

export namespace LoadSportsRepository {
  export type Result = SportModel[]
}
