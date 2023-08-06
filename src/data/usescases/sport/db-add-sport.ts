import { ISportRepository } from '@/data/protocols/db'
import { AddSport } from '@/domain/usecases/sport'

export class DbAddSport implements AddSport {
  constructor (private readonly sportRepository: ISportRepository) { }

  async add (data: AddSport.Params): Promise<AddSport.Result | undefined> {
    const sport = await this.sportRepository.loadByDescription(data.description)
    if (!sport.length) {
      const newSport = await this.sportRepository.add(data)
      return newSport
    }
  }
}
