import { loginPath } from '@/main/docs/paths/login-path'
import { accountSchema } from '@/main/docs/schemas/account-schemas'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'

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
    loginParams: loginParamsSchema
  }
}
