export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cityId: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    photo: {
      type: 'string'
    }
  },
  required: ['name', 'gender', 'password', 'email', 'cityId', 'phoneNumber']
}
