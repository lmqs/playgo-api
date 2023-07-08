export const loginPath = {
  post: {
    tags: ['Conta'],
    summary: 'Api para autenticar usuário',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accountLogin'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
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
