import http from 'node:http'
import { ApolloServer } from '@apollo/server'
import { koaMiddleware } from '@as-integrations/koa'
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { env } from './config/env.js'
import { createGraphQLContext } from './graphql/context.js'
import { resolvers, typeDefs } from './graphql/schema.js'
import { prisma } from './lib/prisma.js'

async function startServer() {
  const app = new Koa()
  const httpServer = http.createServer(app.callback())

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: env.NODE_ENV !== 'production'
  })

  await apollo.start()

  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
      allowHeaders: ['Content-Type', 'Authorization']
    })
  )

  app.use(bodyParser())

  app.use(async (ctx, next) => {
    if (ctx.path === '/health') {
      ctx.status = 200
      ctx.body = {
        status: 'ok',
        service: 'hlongwane-enterprise-backend'
      }
      return
    }

    await next()
  })

  app.use(
    koaMiddleware(apollo, {
      context: async ({ ctx }) => createGraphQLContext(ctx)
    })
  )

  httpServer.listen(env.PORT, () => {
    console.log(`Hlongwane Enterprise API running on http://localhost:${env.PORT}`)
    console.log(`GraphQL endpoint: http://localhost:${env.PORT}/graphql`)
  })

  const shutdown = async () => {
    await apollo.stop()
    await prisma.$disconnect()
    httpServer.close(() => process.exit(0))
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

startServer().catch(async (error) => {
  console.error('Failed to start server', error)
  await prisma.$disconnect()
  process.exit(1)
})
