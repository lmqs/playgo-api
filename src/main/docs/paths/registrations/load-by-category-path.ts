export const loadRegistrationsByCategoryPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Inscrição'],
    summary: 'Api listar os inscritos por categoria',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'query',
      name: 'categoryId',
      description: 'Id da categoria',
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
              $ref: '#/schemas/registrationsByCategorySchema'
            }
          }
        }
      },
      403: {
        $ref: '#/components/unauthorized'
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
