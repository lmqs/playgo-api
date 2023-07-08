export const loadAccountByNamePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Conta'],
    summary: 'Api para obter uma lista de usuários/atletas de acordo com o parâmetro passado',
    parameters: [{
      in: 'query',
      name: 'name',
      description: 'Nome do atleta',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
