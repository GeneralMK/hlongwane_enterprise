import { authResolvers } from '../modules/auth/auth.resolver.js'
import { authTypeDefs } from '../modules/auth/auth.schema.js'

const baseTypeDefs = `#graphql
  type Health {
    status: String!
    service: String!
  }

  type Query {
    health: Health!
  }

  type Mutation {
    _empty: Boolean
  }
`

const baseResolvers = {
  Query: {
    health: () => ({
      status: 'ok',
      service: 'hlongwane-enterprise-backend'
    })
  }
}

export const typeDefs = [baseTypeDefs, authTypeDefs]
export const resolvers = [baseResolvers, authResolvers]
