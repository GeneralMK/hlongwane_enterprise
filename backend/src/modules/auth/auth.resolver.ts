import type { GraphQLContext } from '../../graphql/context.js'
import { loginUser, logoutUser, registerUser } from './auth.service.js'

export const authResolvers = {
  User: {
    createdAt: (user: { createdAt: Date }) => user.createdAt.toISOString(),
    updatedAt: (user: { updatedAt: Date }) => user.updatedAt.toISOString()
  },
  Query: {
    me: (_parent: unknown, _args: unknown, context: GraphQLContext) => context.user
  },
  Mutation: {
    register: (_parent: unknown, args: { input: unknown }) => registerUser(args.input),
    login: (_parent: unknown, args: { input: unknown }) => loginUser(args.input),
    logout: (_parent: unknown, _args: unknown, context: GraphQLContext) =>
      logoutUser(context.accessToken)
  }
}
