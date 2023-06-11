import { RemoveTournamentRepository } from '@/data/protocols/db/tournament'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'

export class RemoveCategoryUseCase implements IRemoveCategory {
  constructor (
    private readonly removeCategoryRepository: RemoveTournamentRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.removeCategoryRepository.remove(id)
  }
}
