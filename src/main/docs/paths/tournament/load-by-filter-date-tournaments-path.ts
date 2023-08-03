export const loadByFilterDateTournamentsPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Torneio'],
    summary: 'Api para listar torneios que estão em andamento ou finalizados',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/tournamentsFilterDateSchema'
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
