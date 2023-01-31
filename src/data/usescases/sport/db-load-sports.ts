import { LoadSportsRepository, LoadSports } from '.'

export class DbLoadSports implements LoadSports {
  constructor (
    private readonly loadSportsRepository: LoadSportsRepository
  ) {}

  async load (): Promise<LoadSports.Result | undefined> {
    return await this.loadSportsRepository.loadAll()
  }
}
