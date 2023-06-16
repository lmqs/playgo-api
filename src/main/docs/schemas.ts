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
  sportParamsSchema,
  sportsSchema,
  updateCategoryParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  category: categorySchema,
  categories: categoriesSchema,
  signupParams: signupParamsSchema,
  categoryParams: categoryParamsSchema,
  categoryUpdateParamsSchema: updateCategoryParamsSchema,
  tournamentParams: tournamentParamsSchema,
  tournament: tournamentSchema,
  tournaments: tournamentsSchema,
  sport: sportSchema,
  sportParams: sportParamsSchema,
  sports: sportsSchema
}
