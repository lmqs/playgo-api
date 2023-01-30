import { loginPath } from '@/main/docs/paths'
import { loginParamsSchema, accountSchema, errorSchema } from '@/main/docs/schemas'
import { badRequest, unauthorized, serverError, forbidden, notFound } from '@/main/docs/components'

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
      name: 'Category'
    }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    forbidden,
    serverError,
    notFound
  }
}
