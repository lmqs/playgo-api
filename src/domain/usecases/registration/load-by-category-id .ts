export interface ILoadRegistrationByCategoryId {
  loadByCategoryId: (data: ILoadRegistrationByCategoryId.Params) => Promise<ILoadRegistrationByCategoryId.Result[]>
}

export namespace ILoadRegistrationByCategoryId {
  export type Params = {
    categoryId: string
    accountId: string
  }
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
    canDeleted: boolean
  }
}
