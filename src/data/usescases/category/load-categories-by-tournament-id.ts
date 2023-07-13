import { ICategoryRepository } from '@/data/protocols/db'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournament-id'

export class DbLoadCategoriesUseCase implements ILoadCategoriesByTournamentId {
  constructor (
    private readonly categoryRepository: ICategoryRepository,
    private readonly registrationsRepository: IRegistrationsRepository
  ) {}

  async load (tournamentId: string): Promise<ILoadCategoriesByTournamentId.Result> {
    const categories = await this.categoryRepository.loadByTournamentId(tournamentId)
    return Promise.all(categories.map(async category => {
      const registration = await this.registrationsRepository.loadByCategory(category.id)
      return {
        ...category,
        numberRegistration: registration.length
      }
    }))
  }
}
