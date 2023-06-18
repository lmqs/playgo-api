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
  updateCategoryParamsSchema,
  tournamentsSponsorSchema,
  tournamentSponsorSchema,
  tournamentSponsorParamsSchema
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
  tournamentSponsorParams: tournamentSponsorParamsSchema,
  tournamentSponsor: tournamentSponsorSchema,
  tournamentsSponsor: tournamentsSponsorSchema,
  sport: sportSchema,
  sportParams: sportParamsSchema,
  sports: sportsSchema
}
