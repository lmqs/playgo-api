import { RegistrationsModel } from '@/domain/models/registrations'

export interface ILoadRegistrationById {
  loadById: (id: string) => Promise<ILoadRegistrationById.Result | undefined>
}

export namespace ILoadRegistrationById {
  export type Result = RegistrationsModel
}
