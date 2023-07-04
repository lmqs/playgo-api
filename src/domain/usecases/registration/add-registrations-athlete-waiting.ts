export interface IAddRegistrationsAthleteWaiting {
  add: (registrationAthleteWaiting: IAddRegistrationsAthleteWaiting.Params) => Promise<IAddRegistrationsAthleteWaiting.ResultObj>
}

export namespace IAddRegistrationsAthleteWaiting {
  export type Params = {
    categoryId: string
    athletesId: string
  }

  export type ResultObj = {
    id: string
    categoryId: string
    athleteId: string
    date: string
    deleted: boolean
  }
}
