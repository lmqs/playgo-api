import { IRegistrationsAthleteRepository } from '@/data/protocols/db'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { IRemoveRegistrationUseCase } from '@/domain/usecases/registration/remove'

export class RemoveRegistrationUseCase implements IRemoveRegistrationUseCase {
  constructor (
    private readonly registrationsRepo: IRegistrationsRepository,
    private readonly registrationsAthleteRepo: IRegistrationsAthleteRepository
  ) {}

  async remove (id: string): Promise<void> {
    await this.registrationsAthleteRepo.removeByRegistration(id)
    await this.registrationsRepo.remove(id)
  }
}
