import { ICategoryRepository } from '@/data/protocols/db'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'

export class RemoveCategoryUseCase implements IRemoveCategory {
  constructor (
    private readonly removeCategoryRepository: ICategoryRepository,
    private readonly registrationsRepository: IRegistrationsRepository
  ) {}

  async remove (id: string): Promise<void> {
    const registrations = await this.registrationsRepository.loadByCategory(id)
    if (registrations.length) throw new Error('Essa categoria não pode ser removida pois existem atletas inscritos.')
    await this.removeCategoryRepository.remove(id)
  }
}
