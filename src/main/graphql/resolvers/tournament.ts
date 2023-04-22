import { adaptResolver } from '@/main/adapters'
import { makeLoadTournamentsController } from '@/main/factories/controllers/tournament'

export default {
  Query: {
    tournaments: async () => await adaptResolver(makeLoadTournamentsController())
  }
}
