export const removeRegistrationsPath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Inscrição'],
    summary: 'Api para remover uma inscrição',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID da inscrição',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      201: {
        description: 'No content'
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
