# Hlongwane Enterprise Frontend

Customer and admin web application for the Hlongwane Enterprise device commerce ecosystem.

## Stack

- Vite
- React
- TypeScript
- Chakra UI
- Apollo Client
- React Router
- Supabase client
- Yarn

## Setup

```bash
cd frontend
yarn install
cp .env.example .env
yarn dev
```

The frontend runs on `http://localhost:5173` by default.

## Environment variables

```env
VITE_API_URL=http://localhost:4000/graphql
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Scripts

```bash
yarn dev
yarn build
yarn preview
yarn typecheck
```

## Initial routes

- `/`
- `/phones`
- `/laptops`
- `/tablets`
- `/accessories`
- `/login`
- `/cart`

Additional storefront, checkout, account, order, and admin routes will be added incrementally from the product backlog.
