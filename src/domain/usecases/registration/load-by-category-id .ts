export interface ILoadRegistrationByCategoryId {
  loadByCategoryId: (data: ILoadRegistrationByCategoryId.Params) => Promise<ILoadRegistrationByCategoryId.Result>
}

export namespace ILoadRegistrationByCategoryId {
  export type Params = {
    categoryId: string
    accountId: string
  }

  export type Result = Array<{
    id: string
    athletes: AthleteData[]
  }>

  type AthleteData = {
    id: string
    name: string
    photo?: string
    canDeleted: boolean
    isPay: boolean
  }
}
