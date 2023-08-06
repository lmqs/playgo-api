import { ISportRepository } from '@/data/protocols/db'
import { LoadSportByDescription } from '@/domain/usecases/sport'

export class DbLoadSportByDescription implements LoadSportByDescription {
  constructor (private readonly sportRepository: ISportRepository) {}

  async loadByDescription (description: string): Promise<LoadSportByDescription.Result> {
    return await this.sportRepository.loadByDescription(description)
  }
}
