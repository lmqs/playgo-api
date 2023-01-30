import {
  errorSchema,
  accountSchema,
  loginParamsSchema,
  categorySchema,
  categoriesSchema,
  signupParamsSchema,
  categoryParamsSchema,
  tournamentParamsSchema,
  tournamentSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  error: errorSchema,
  category: categorySchema,
  categories: categoriesSchema,
  signupParams: signupParamsSchema,
  categoryParams: categoryParamsSchema,
  tournamentParams: tournamentParamsSchema,
  tournament: tournamentSchema
}
