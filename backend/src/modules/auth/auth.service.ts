import { GraphQLError } from 'graphql'
import { z } from 'zod'

import { prisma } from '../../lib/prisma.js'
import { supabase, supabaseAdmin } from '../../lib/supabase.js'

const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  mobileNumber: z.string().trim().min(7).max(20),
  password: z.string().min(8).max(128)
})

const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(128)
})

function badRequest(message: string) {
  return new GraphQLError(message, { extensions: { code: 'BAD_USER_INPUT' } })
}

function unauthenticated(message = 'Invalid email or password') {
  return new GraphQLError(message, { extensions: { code: 'UNAUTHENTICATED' } })
}

export async function registerUser(input: unknown) {
  const parsed = registerSchema.safeParse(input)
  if (!parsed.success) throw badRequest('Please provide valid registration details')

  const { firstName, lastName, email, mobileNumber, password } = parsed.data

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw badRequest('An account with this email already exists')

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { firstName, lastName, mobileNumber }
    }
  })

  if (error || !data.user) {
    throw badRequest(error?.message ?? 'Unable to create account')
  }

  try {
    const user = await prisma.user.create({
      data: {
        authUserId: data.user.id,
        email,
        firstName,
        lastName,
        phone: mobileNumber
      }
    })

    return {
      accessToken: data.session?.access_token ?? null,
      refreshToken: data.session?.refresh_token ?? null,
      expiresIn: data.session?.expires_in ?? null,
      user,
      emailConfirmationRequired: !data.session
    }
  } catch (error) {
    await supabaseAdmin.auth.admin.deleteUser(data.user.id).catch(() => undefined)
    throw error
  }
}

export async function loginUser(input: unknown) {
  const parsed = loginSchema.safeParse(input)
  if (!parsed.success) throw unauthenticated()

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error || !data.user || !data.session) throw unauthenticated()

  const metadata = data.user.user_metadata ?? {}

  const user = await prisma.user.upsert({
    where: { authUserId: data.user.id },
    update: { email: data.user.email ?? parsed.data.email },
    create: {
      authUserId: data.user.id,
      email: data.user.email ?? parsed.data.email,
      firstName: String(metadata.firstName ?? ''),
      lastName: String(metadata.lastName ?? ''),
      phone: metadata.mobileNumber ? String(metadata.mobileNumber) : null
    }
  })

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresIn: data.session.expires_in,
    user,
    emailConfirmationRequired: false
  }
}

export async function logoutUser(accessToken: string | null) {
  if (!accessToken) throw unauthenticated('You must be logged in')

  const { error } = await supabaseAdmin.auth.admin.signOut(accessToken, 'global')
  if (error) {
    throw new GraphQLError('Unable to sign out', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' }
    })
  }

  return true
}
