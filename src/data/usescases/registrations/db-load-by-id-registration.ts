import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { ILoadRegistrationById } from '@/domain/usecases/registration/load-registration-by-id'

export class LoadRegistrationByIdUseCase implements ILoadRegistrationById {
  constructor (
    private readonly registrationsRepo: IRegistrationsRepository
  ) {}

  async loadById (id: string): Promise<ILoadRegistrationById.Result | undefined> {
    return await this.registrationsRepo.loadById(id)
  }
}
