export const categoryPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Categoria'],
    summary: 'Api para listar categorias',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'query',
      name: 'tournamentId',
      description: 'ID do torneio',
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
              $ref: '#/schemas/categories'
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
