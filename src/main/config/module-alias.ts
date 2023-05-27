import { addAlias } from 'module-alias'
import { resolve } from 'path'
import { ENVIRONMENT } from './env'

addAlias('@', resolve(ENVIRONMENT.server.node_env === 'development' ? 'src' : 'build'))
