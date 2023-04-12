import { adaptResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/account/login/login-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      return await adaptResolver(makeLoginController(), args)
    }
  }
}
