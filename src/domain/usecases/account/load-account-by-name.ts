
export interface ILoadAccountByName {
  loadByName: (name: string) => Promise<any>
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
    role?: string
    photo?: string
    deleted: boolean
  }
}
