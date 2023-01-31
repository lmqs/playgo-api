export const sportSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    deleted: {
      type: 'boolean'
    }
  },
  required: ['id', 'description', 'deleted']
}
