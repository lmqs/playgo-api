export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    user: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
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
  required: ['name', 'user', 'password', 'email', 'cityId', 'phoneNumber']
}
