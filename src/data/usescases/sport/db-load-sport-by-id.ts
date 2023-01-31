
import { LoadSportById, LoadSportByIdRepository } from '.'

export class DbLoadSportById implements LoadSportById {
  constructor (
    private readonly loadSportByIdRepository: LoadSportByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadSportById.Result | undefined> {
    return await this.loadSportByIdRepository.loadById(id)
  }
}
