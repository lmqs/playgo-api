import {
  errorSchema,
  accountSchema,
  loginParamsSchema,
  categorySchema,
  categoriesSchema,
  signupParamsSchema,
  categoryParamsSchema,
  tournamentParamsSchema,
  tournamentSchema,
  tournamentsSchema,
  sportSchema,
  sportParamsSchema
} from './schemas/'
import { sportsSchema } from './schemas/sports-schemas'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  category: categorySchema,
  categories: categoriesSchema,
  signupParams: signupParamsSchema,
  categoryParams: categoryParamsSchema,
  tournamentParams: tournamentParamsSchema,
  tournament: tournamentSchema,
  tournaments: tournamentsSchema,
  sport: sportSchema,
  sportParams: sportParamsSchema,
  sports: sportsSchema
}
