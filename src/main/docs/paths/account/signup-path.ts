export const signupPath = {
  post: {
    tags: ['Conta'],
    summary: 'Api para criar conta de um usuário',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#schemas/signupParams'
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
