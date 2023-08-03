import { ICategoryRepository } from '@/data/protocols/db'
import { ILoadCategoryById } from '@/domain/usecases/category/load-category-by-id'

export class DbLoadCategoryByIdUseCase implements ILoadCategoryById {
  constructor (
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async loadById (id: string): Promise<ILoadCategoryById.Result | undefined> {
    return await this.categoryRepository.loadById(id)
  }
}
