
export interface IRemoveRegistrationUseCase {
  remove: (id: string) => Promise<void>
}
