import type { UserRole } from '@prisma/client'
import { GraphQLError } from 'graphql'

import type { GraphQLContext } from '../../graphql/context.js'

export function requireUser(context: GraphQLContext) {
  if (!context.user) {
    throw new GraphQLError('Authentication required', {
      extensions: { code: 'UNAUTHENTICATED' }
    })
  }

  return context.user
}

export function requireRole(context: GraphQLContext, roles: UserRole[]) {
  const user = requireUser(context)

  if (!roles.includes(user.role)) {
    throw new GraphQLError('You do not have permission to perform this action', {
      extensions: { code: 'FORBIDDEN' }
    })
  }

  return user
}
