import { AuthenticationModel } from '@/domain/models/authentication'
export interface IAuthentication {
  auth: (authentication: IAuthentication.Params) => Promise<IAuthentication.Result | undefined>
}
export namespace IAuthentication {
  export type Params = {
    email: string
    password: string
    role?: string
  }
  export type Result = AuthenticationModel
}
