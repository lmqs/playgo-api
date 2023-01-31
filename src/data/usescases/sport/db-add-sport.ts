import { AddSport, AddSportRepository, LoadSportByDescriptionRepository } from '.'

export class DbAddSport implements AddSport {
  constructor (
    private readonly addSportRepository: AddSportRepository,
    private readonly loadSportByDescriptionRepository: LoadSportByDescriptionRepository
  ) { }

  async add (data: AddSport.Params): Promise<AddSport.Result | undefined> {
    const sport = await this.loadSportByDescriptionRepository.loadByDescription(data.description)
    if (!sport) {
      const newSport = await this.addSportRepository.add(data)
      return newSport
    }
  }
}
