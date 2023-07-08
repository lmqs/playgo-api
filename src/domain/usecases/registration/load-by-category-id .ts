export interface ILoadRegistrationByCategoryId {
  loadByCategoryId: (categoryId: string) => Promise<ILoadRegistrationByCategoryId.Result[]>
}

export namespace ILoadRegistrationByCategoryId {
  export type Result = {
    id: string
    registrationsId: string
    athleteId: {
      id: string
      name: string
      photo?: string
    }
    isPay: boolean
    deleted?: boolean
  }
}
