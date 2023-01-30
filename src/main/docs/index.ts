import { loginPath, categoryPath } from '@/main/docs/paths'
import { loginParamsSchema, accountSchema, errorSchema, categorySchema, apiKeyAuthSchema } from '@/main/docs/schemas'
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
    '/loadCategoriesByTournamentId': categoryPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    category: categorySchema,
    categories: categoriesSchema
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
