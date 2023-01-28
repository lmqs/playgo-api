import { AuthenticationModel } from '../../../domain/models/authentication'

export interface Authentication {
  auth: (authentication: Authentication.Params) => Promise<Authentication.Result | undefined>
}

export namespace Authentication {
  export type Params = {
    user: string
    password: string
  }
  export type Result = AuthenticationModel
}
