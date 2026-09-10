import type { PrismaClient, User } from '@prisma/client'
import type Koa from 'koa'

import { prisma } from '../lib/prisma.js'
import { supabaseAdmin } from '../lib/supabase.js'

export type GraphQLContext = {
  ctx: Koa.Context
  prisma: PrismaClient
  user: User | null
  accessToken: string | null
}

function getBearerToken(authorization?: string): string | null {
  if (!authorization) return null
  const [scheme, token] = authorization.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null
  return token
}

export async function createGraphQLContext(ctx: Koa.Context): Promise<GraphQLContext> {
  const accessToken = getBearerToken(ctx.headers.authorization)

  if (!accessToken) {
    return { ctx, prisma, user: null, accessToken: null }
  }

  const { data, error } = await supabaseAdmin.auth.getUser(accessToken)

  if (error || !data.user) {
    return { ctx, prisma, user: null, accessToken }
  }

  const user = await prisma.user.findUnique({
    where: { authUserId: data.user.id }
  })

  return { ctx, prisma, user, accessToken }
}
