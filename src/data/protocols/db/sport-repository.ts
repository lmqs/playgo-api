import { SportModel } from '@/domain/models/sport'

export interface ISportRepository {
  add: (data: ISportRepository.AddParams) => Promise<ISportRepository.Result>
  loadByDescription: (description: string) => Promise<ISportRepository.Results>
  loadById: (id: string) => Promise<ISportRepository.Result | undefined>
  loadAll: () => Promise<ISportRepository.Results>

}

export namespace ISportRepository {
  export type AddParams = {
    description: string
  }
  export type Result = SportModel
  export type Results = SportModel[]
}
