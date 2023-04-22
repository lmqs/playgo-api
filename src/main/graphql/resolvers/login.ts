import { adaptResolver } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/account/login/login-controller-factory'
import { makeSignUpController } from '@/main/factories/controllers/account/signup/signup-controller-factory'

export default {
  Query: {
    async login (parent: any, args: any) {
      return await adaptResolver(makeLoginController(), args)
    }
  },
  Mutation: {
    signup: async (parent: any, args: any) => await adaptResolver(makeSignUpController(), args)
  }
}
