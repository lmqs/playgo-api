import { addCategoryPath, loadCategoryPath, loginPath, signupPath } from '@/main/docs/paths'
import { loginParamsSchema, accountSchema, errorSchema, categorySchema, apiKeyAuthSchema, signupParamsSchema, categoryParamsSchema } from '@/main/docs/schemas'
import { badRequest, unauthorized, serverError, forbidden, notFound } from '@/main/docs/components'
import { categoriesSchema } from './schemas/categories-schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: '',
    description: 'API do app PlayGo',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Login'
    },
    {
      name: 'Categoria'
    }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/loadCategoriesByTournamentId': loadCategoryPath,
    '/category': addCategoryPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    category: categorySchema,
    categories: categoriesSchema,
    signupParams: signupParamsSchema,
    categoryParams: categoryParamsSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    forbidden,
    serverError,
    notFound
  }
}
