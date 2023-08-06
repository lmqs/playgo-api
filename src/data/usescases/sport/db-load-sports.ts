import { ISportRepository } from '@/data/protocols/db'
import { LoadSports } from '@/domain/usecases/sport'

export class DbLoadSports implements LoadSports {
  constructor (private readonly sportRepository: ISportRepository) {}

  async load (): Promise<LoadSports.Result> {
    return await this.sportRepository.loadAll()
  }
}
