export interface IAddRegistrations {
  add: (registerCategoryAthlete: IAddRegistrations.Params) => Promise<IAddRegistrations.ResultObj>
}

export namespace IAddRegistrations {
  export type Params = {
    categoryId: string
    athletesId: string
    registrationDate?: string
    isPay?: boolean
    accountId: string
  }

  export type ResultObj = Array<{
    id: string
    registrationsId: string
    athlete: {
      id: string
      name: string
    }
    isPay: boolean
    deleted: boolean
  }>
}
