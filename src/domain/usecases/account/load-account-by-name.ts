
export interface ILoadAccountByName {
  loadByName: (name: string) => Promise<ILoadAccountByName.Result[]>
}

export namespace ILoadAccountByName {
  export type Result = {
    id: string
    name: string
    gender: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
  }
}
