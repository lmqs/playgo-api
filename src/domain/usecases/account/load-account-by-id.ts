export interface ILoadAccountById {
  loadById: (id: string) => Promise<ILoadAccountById.Result | undefined>
}

export namespace ILoadAccountById {
  export type Result = {
    id: string
    name: string
    gender: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
    photo?: string
  }
}
