
import { ISportRepository } from '@/data/protocols/db'
import { LoadSportById } from '@/domain/usecases/sport'

export class DbLoadSportById implements LoadSportById {
  constructor (private readonly sportRepository: ISportRepository) {}

  async loadById (id: string): Promise<LoadSportById.Result | undefined> {
    return await this.sportRepository.loadById(id)
  }
}
