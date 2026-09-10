# Hlongwane Enterprise Backend

Backend API for the Hlongwane Enterprise device commerce ecosystem.

## Stack

- Node.js 22+
- TypeScript
- Koa
- Apollo GraphQL
- Prisma ORM
- PostgreSQL / Supabase

## Getting started

```bash
cd backend
cp .env.example .env
yarn install
yarn prisma:generate
yarn prisma:migrate
yarn dev
```

The API runs on `http://localhost:4000` by default.

- GraphQL: `http://localhost:4000/graphql`
- Health: `http://localhost:4000/health`

## Environment

Configure `.env` with the Supabase PostgreSQL connection strings and application secrets. Never commit real credentials.

## Current foundation

The initial foundation includes:

- Koa HTTP server
- Apollo GraphQL server
- Environment validation
- Prisma connection
- Initial User, Brand, Category, Product and ProductVariant data models
- GraphQL health query
- REST health endpoint

## Planned modules

```text
src/modules/
├── auth/
├── users/
├── products/
├── categories/
├── brands/
├── inventory/
├── cart/
├── checkout/
├── orders/
├── payments/
├── shipping/
├── returns/
└── admin/
```

Development will follow the PRS requirements and GitHub Epics.
