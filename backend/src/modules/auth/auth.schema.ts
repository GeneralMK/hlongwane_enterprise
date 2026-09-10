export const authTypeDefs = `#graphql
  enum UserRole {
    CUSTOMER
    ADMIN
    SUPER_ADMIN
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    accessToken: String
    refreshToken: String
    expiresIn: Int
    user: User!
    emailConfirmationRequired: Boolean!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    mobileNumber: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    logout: Boolean!
  }
`
