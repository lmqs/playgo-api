import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: '',
    description: 'API do app PlayGo',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Account'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Esporte'
    }
  ],
  paths,
  schemas,
  components
}
