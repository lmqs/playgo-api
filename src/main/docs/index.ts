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
      name: 'Conta'
    },
    {
      name: 'Categoria'
    },
    {
      name: 'Esporte'
    },
    {
      name: 'Torneio'
    },
    {
      name: 'Inscrição'
    }
  ],
  paths,
  schemas,
  components
}
