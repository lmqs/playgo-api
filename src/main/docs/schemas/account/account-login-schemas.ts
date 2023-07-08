export const accountLoginSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    isAdmin: {
      type: 'boolean'
    }
  },
  required: ['accessToken', 'name', 'isAdmin']
}
