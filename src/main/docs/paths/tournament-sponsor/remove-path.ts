export const removeTournamentSponsorPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Torneio'],
    summary: 'Api para remover um patrocinador de um torneio',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do torneio',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        description: 'Sucesso'
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
