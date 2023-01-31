import { LoadSportByDescriptionRepository, LoadSportByDescription } from '.'

export class DbLoadSportByDescription implements LoadSportByDescription {
  constructor (
    private readonly loadSportByDescriptionRepository: LoadSportByDescriptionRepository
  ) {}

  async loadByDescription (description: string): Promise<LoadSportByDescription.Result | undefined> {
    return await this.loadSportByDescriptionRepository.loadByDescription(description)
  }
}
