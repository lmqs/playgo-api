export const registrationsParamsSchema = {
  type: 'object',
  properties: {
    categoryId: {
      type: 'string'
    },
    athletesId: {
      type: 'string',
      example: '2,3,4'
    }
  },
  required: ['categoryId', 'athletesId']
}
