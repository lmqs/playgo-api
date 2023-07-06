
export interface IUpdateAccount {
  update: (account: IUpdateAccount.Params) => Promise<IUpdateAccount.Result | Error>
}
export namespace IUpdateAccount {
  export type Params = {
    id: string
    name: string
    gender: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
    photo?: string
    deleted?: boolean
    role?: string
  }
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
