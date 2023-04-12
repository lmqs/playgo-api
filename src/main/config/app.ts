import express, { Express } from 'express'
import setupApolloServer from './apollo-server'
import setupMiddlewares from './midlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  const server = setupApolloServer()
  await server.start()
  server.applyMiddleware({ app })
  return app
}
