export const loadTournamentByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Torneio'],
    summary: 'Api para listar torneios a partir do id',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'query',
      name: 'id',
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
              $ref: '#/schemas/tournamentFormattedDate'
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
