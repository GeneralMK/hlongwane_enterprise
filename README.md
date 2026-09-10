# Hlongwane Phones & Laptops E-Commerce Ecosystem

A modern full-stack e-commerce ecosystem for purchasing **smartphones, laptops, tablets, accessories, and related technology products online**.

The platform provides customers with a complete shopping experience, including product discovery, secure online payments, order tracking, account management, and support.

An integrated administration portal provides product, inventory, customer, payment, and order management capabilities.

---

## 1. Project Overview

The goal of this project is to build a scalable technology-commerce ecosystem rather than a basic online store.

Customers will be able to:

* Browse phones, laptops, tablets, and accessories.
* Search and filter products.
* Compare product specifications.
* Select product variants such as colour, storage, RAM, and condition.
* Add products to a cart.
* Complete checkout.
* Pay securely online.
* Track orders.
* View previous purchases.
* Manage delivery addresses.
* Manage their account.
* Request returns or support.

Administrators will be able to manage the entire commerce operation from a dedicated admin portal.

---

# 2. Technology Stack

## Frontend

The customer storefront and administration portal are built using:

* Vite
* React
* TypeScript
* Chakra UI
* Apollo Client
* React Router

### Frontend Responsibilities

The frontend handles:

* Customer storefront
* Authentication UI
* Product catalogue
* Product search and filtering
* Product details
* Shopping cart
* Checkout
* Payment initiation
* Customer account
* Order tracking
* Admin portal
* Responsive mobile and desktop interfaces

---

## Backend

The backend is built using:

* Node.js
* TypeScript
* Koa
* Apollo Server
* GraphQL
* Prisma ORM

### Backend Responsibilities

The backend handles:

* Authentication and authorization
* User management
* Product management
* Product variants
* Inventory
* Shopping carts
* Orders
* Payments
* Payment verification
* Payment webhooks
* Shipping
* Promotions
* Returns
* Reviews
* Administration
* Business rules
* Audit history

---

## Database & Storage

The platform uses Supabase.

### Supabase PostgreSQL

PostgreSQL stores the application's transactional and relational data.

Prisma is used as the ORM between the Node.js backend and PostgreSQL.

### Supabase Storage

Supabase Storage can be used for:

* Product images
* Brand logos
* Category images
* User profile images
* Return evidence
* Supporting documents

### Authentication

Authentication can be implemented using Supabase Auth or a custom JWT-based authentication service.

The backend remains responsible for authorization and determining what authenticated users are permitted to access.

---

# 3. High-Level Architecture

```text
┌──────────────────────────────────────┐
│              CUSTOMER                │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│          VITE + REACT                │
│                                      │
│  Storefront                          │
│  Customer Account                    │
│  Checkout                            │
│  Admin Portal                        │
│                                      │
│  Chakra UI                           │
│  Apollo Client                       │
└──────────────────┬───────────────────┘
                   │
                   │ GraphQL
                   ▼
┌──────────────────────────────────────┐
│          NODE.JS + KOA               │
│          APOLLO SERVER               │
│                                      │
│  Authentication                     │
│  Products                            │
│  Cart                                │
│  Orders                              │
│  Payments                            │
│  Inventory                           │
│  Shipping                            │
│  Administration                     │
└─────────────┬─────────────┬──────────┘
              │             │
              ▼             ▼
      ┌──────────────┐  ┌──────────────┐
      │    PRISMA    │  │   PAYMENT    │
      │              │  │  PROVIDERS   │
      └──────┬───────┘  └──────────────┘
             │
             ▼
┌──────────────────────────────────────┐
│              SUPABASE                │
│                                      │
│  PostgreSQL                          │
│  Storage                             │
│  Authentication                     │
└──────────────────────────────────────┘
```

---

# 4. Core Platform Modules

The platform is divided into independent business domains.

```text
Authentication
Users
Products
Categories
Brands
Product Variants
Inventory
Cart
Wishlist
Checkout
Orders
Payments
Shipping
Promotions
Reviews
Returns
Support
Notifications
Administration
Reporting
```

This architecture allows individual modules to evolve without tightly coupling unrelated functionality.

---

# 5. Product Catalogue

The initial product catalogue supports:

### Phones

Examples:

* Apple iPhone
* Samsung Galaxy
* Google Pixel
* Huawei
* Xiaomi

Phone-specific attributes may include:

* Storage
* Colour
* RAM
* Network
* SIM type
* Screen size
* Battery
* Camera
* Condition

### Laptops

Laptop-specific attributes may include:

* Processor
* RAM
* Storage
* Screen size
* GPU
* Operating system
* Colour
* Condition

### Tablets

Tablet-specific attributes may include:

* Storage
* RAM
* Screen size
* Connectivity
* Colour

### Accessories

Examples:

* Chargers
* Cables
* Cases
* Screen protectors
* Keyboards
* Mice
* Headphones
* Earphones
* Laptop bags
* Power banks

---

# 6. Product Variants

Products can contain multiple variants.

For example:

```text
iPhone

├── 256GB
│   ├── Black
│   ├── Silver
│   └── Blue
│
├── 512GB
│   ├── Black
│   ├── Silver
│   └── Blue
│
└── 1TB
    ├── Black
    └── Silver
```

Each variant can contain its own:

* SKU
* Price
* Discount price
* Stock quantity
* Storage
* RAM
* Colour
* Condition
* Images
* Availability

---

# 7. Device Inventory

Phones and laptops may require individual device tracking.

Each physical device can optionally contain:

* Serial number
* IMEI
* SKU
* Product variant
* Stock status
* Purchase order reference
* Sale order reference
* Warranty information

Example device statuses:

```text
AVAILABLE
RESERVED
SOLD
RETURNED
DAMAGED
REPAIR
```

This allows the platform to know exactly which physical device was sold to a customer.

---

# 8. Customer Storefront

## Main Routes

```text
/
├── /phones
├── /laptops
├── /tablets
├── /accessories
├── /brands
├── /deals
│
├── /product/:slug
│
├── /cart
├── /checkout
├── /payment/callback
│
├── /login
├── /register
│
└── /account
    ├── /profile
    ├── /orders
    ├── /orders/:id
    ├── /addresses
    ├── /wishlist
    └── /support
```

---

# 9. Product Search & Filtering

Customers should be able to search by:

* Product name
* Brand
* Category
* Model
* SKU

Filters may include:

```text
Category
Brand
Price
Storage
RAM
Colour
Condition
Screen Size
Processor
Availability
```

Sorting options include:

```text
Recommended
Newest
Price: Low to High
Price: High to Low
Best Selling
Highest Rated
```

---

# 10. Shopping Cart

Customers can:

* Add products
* Remove products
* Change quantities
* Select product variants
* View subtotal
* Apply promotional codes
* View estimated delivery
* Continue to checkout

The backend must always recalculate pricing before an order is created.

Prices supplied by the frontend must never be trusted as the final transaction amount.

---

# 11. Checkout

The checkout process follows:

```text
Cart
 ↓
Authentication
 ↓
Delivery Address
 ↓
Delivery Method
 ↓
Order Review
 ↓
Payment Method
 ↓
Create Pending Order
 ↓
Initialize Payment
 ↓
Payment Provider
 ↓
Payment Verification
 ↓
Order Confirmation
```

---

# 12. Payments

The payment architecture must remain provider-neutral.

The internal platform should interact with a common payment interface rather than implementing checkout logic directly against one provider.

Example:

```text
PaymentService

├── initializePayment()
├── verifyPayment()
├── processWebhook()
├── refundPayment()
└── getPaymentStatus()
```

This allows multiple providers to be introduced.

Possible providers include:

```text
PAYSTACK
PAYFAST
OZOW
PEACH
PAYFLEX
MOBICRED
```

Supported payment experiences may eventually include:

* Debit/Credit Card
* EFT
* Instant EFT
* Buy Now Pay Later
* Device financing

---

# 13. Payment Security

The browser must never determine whether an order has successfully been paid.

A customer returning to:

```text
/payment/callback
```

does **not** automatically mean that payment was successful.

The backend must verify the transaction using:

1. Payment provider webhook notifications, and/or
2. Server-to-server payment verification.

Only after successful verification should the order be marked as paid.

---

# 14. Payment Status

Possible payment statuses:

```text
PENDING
PROCESSING
SUCCESS
FAILED
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
```

Every transaction must contain a unique payment reference.

---

# 15. Order Lifecycle

Orders follow an explicit lifecycle.

```text
PENDING_PAYMENT
       ↓
PAID
       ↓
PROCESSING
       ↓
PACKED
       ↓
SHIPPED
       ↓
OUT_FOR_DELIVERY
       ↓
DELIVERED
```

Alternative outcomes include:

```text
PAYMENT_FAILED
CANCELLED
RETURN_REQUESTED
RETURNED
REFUNDED
PARTIALLY_REFUNDED
```

Every order status change should be recorded in an order history table.

---

# 16. Inventory Management

Inventory must support:

* Current stock
* Reserved stock
* Available stock
* Sold stock
* Returned stock
* Damaged stock
* Low-stock alerts
* Stock adjustments
* Stock movement history

Inventory changes must be auditable.

Example:

```text
Stock: 10

Customer places order
Reserved: 1

Available: 9

Payment successful
Sold: 1

Payment fails/cancelled
Reservation released
Available: 10
```

This prevents multiple customers from purchasing the same final unit.

---

# 17. Customer Account

Customers should have access to:

### Profile

Manage:

* Name
* Email
* Mobile number
* Password
* Communication preferences

### Addresses

Customers can maintain multiple:

* Delivery addresses
* Billing addresses

### Orders

Customers can:

* View orders
* View payment status
* Track delivery
* Download invoices
* Request cancellation
* Request returns

### Wishlist

Customers can save products for later.

---

# 18. Administration Portal

The admin portal provides centralized management of the platform.

Example route:

```text
/admin
```

---

## Admin Dashboard

Dashboard metrics may include:

```text
Revenue
Orders
Customers
Products
Average Order Value
Pending Orders
Failed Payments
Low Stock Products
Returns
```

---

## Product Management

Administrators can:

* Create products
* Edit products
* Archive products
* Upload product images
* Create variants
* Update pricing
* Manage specifications
* Assign categories
* Assign brands
* Create discounts

---

## Inventory Management

Administrators can:

* View inventory
* Adjust inventory
* Track stock
* View low-stock products
* Manage serial numbers
* Manage IMEI numbers
* View stock movement history

---

## Order Management

Administrators can view orders by:

```text
All Orders
Pending Payment
Paid
Processing
Packed
Shipped
Delivered
Cancelled
Returns
Refunded
```

Administrators can also view the complete order history.

---

## Payment Management

Administrators can:

* View transactions
* Search payment references
* View successful payments
* View failed payments
* View payment provider
* View payment metadata
* Process permitted refunds
* Reconcile payments against orders

---

## Customer Management

Administrators can:

* Search customers
* View customer profiles
* View purchase history
* View support requests
* View returns
* View account status

Sensitive customer information must only be accessible to authorized roles.

---

# 19. Roles & Permissions

Initial roles:

```text
CUSTOMER
ADMIN
SUPER_ADMIN
```

Future roles may include:

```text
ORDER_MANAGER
INVENTORY_MANAGER
SUPPORT_AGENT
FINANCE
MARKETING
```

Authorization must be enforced by the backend.

Hiding a button in React is not considered authorization.

---

# 20. Backend Project Structure

Recommended structure:

```text
src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── products/
│   ├── categories/
│   ├── brands/
│   ├── inventory/
│   ├── cart/
│   ├── wishlist/
│   ├── checkout/
│   ├── orders/
│   ├── payments/
│   ├── shipping/
│   ├── promotions/
│   ├── reviews/
│   ├── returns/
│   ├── notifications/
│   └── admin/
│
├── graphql/
├── middleware/
├── services/
├── utilities/
├── config/
├── prisma/
└── server.ts
```

Each domain can follow:

```text
products/
├── product.schema.ts
├── product.resolver.ts
├── product.service.ts
├── product.repository.ts
├── product.validation.ts
└── product.types.ts
```

---

# 21. Frontend Project Structure

Recommended frontend structure:

```text
src/
├── app/
├── assets/
├── components/
├── layouts/
├── pages/
│
├── features/
│   ├── auth/
│   ├── products/
│   ├── search/
│   ├── cart/
│   ├── checkout/
│   ├── payments/
│   ├── account/
│   ├── orders/
│   ├── wishlist/
│   └── admin/
│
├── graphql/
├── hooks/
├── context/
├── routes/
├── theme/
├── types/
├── utils/
└── main.tsx
```

---

# 22. GraphQL API

Example queries:

```graphql
query Products {
  products {
    id
    name
    slug
    description
    variants {
      id
      sku
      price
      stock
    }
  }
}
```

Product filtering:

```graphql
query Products {
  products(
    category: "phones"
    brand: "Apple"
    minPrice: 10000
    maxPrice: 30000
  ) {
    id
    name
    slug
  }
}
```

Example cart mutation:

```graphql
mutation AddToCart {
  addToCart(
    input: {
      variantId: "PRODUCT_VARIANT_ID"
      quantity: 1
    }
  ) {
    id
    total
  }
}
```

---

# 23. GraphQL Modules

Initial GraphQL domains:

```text
Auth
User
Product
ProductVariant
Brand
Category
Inventory
Cart
Checkout
Order
Payment
Shipping
Wishlist
Promotion
Review
Return
Admin
```

---

# 24. Environment Variables

Example backend configuration:

```env
NODE_ENV=development
PORT=4000

DATABASE_URL=

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

JWT_SECRET=

FRONTEND_URL=http://localhost:5173

PAYMENT_PROVIDER=
PAYMENT_SECRET_KEY=
PAYMENT_PUBLIC_KEY=
PAYMENT_WEBHOOK_SECRET=
```

Frontend:

```env
VITE_API_URL=http://localhost:4000/graphql

VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_PAYMENT_PUBLIC_KEY=
```

Never commit real credentials to source control.

---

# 25. Security Requirements

The platform handles payments and customer information, therefore security is a core requirement.

The application must implement:

* Secure authentication
* Backend authorization
* Role-based access control
* Input validation
* GraphQL query protection
* Rate limiting
* Secure HTTP headers
* CORS restrictions
* Payment webhook signature validation
* Server-side payment verification
* Environment variable protection
* Audit logging
* Sensitive data masking
* Secure file upload validation

Card details must not be stored directly by the platform.

Payment card handling should remain within the approved payment provider's infrastructure.

---

# 26. MVP Scope

## Customer

Version 1 includes:

* Authentication
* Product catalogue
* Phones
* Laptops
* Accessories
* Categories
* Brands
* Product variants
* Search
* Filters
* Product details
* Cart
* Checkout
* Online payments
* Orders
* Order tracking
* Customer account
* Delivery addresses

## Administration

Version 1 includes:

* Dashboard
* Product management
* Product image uploads
* Product variants
* Category management
* Brand management
* Inventory management
* Order management
* Customer management
* Payment management

---

# 27. Phase 2

Future functionality may include:

* Wishlist
* Reviews
* Ratings
* Coupons
* Promotions
* Returns
* Automated refunds
* Email/SMS notifications
* Buy Now Pay Later
* Product recommendations
* Advanced analytics

---

# 28. Future Ecosystem

The long-term platform can expand beyond traditional e-commerce.

```text
                    ECOSYSTEM
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
     STORE           TRADE-IN         REPAIRS
       │                │                │
       ▼                ▼                ▼
    DEVICES          CREDIT          BOOKINGS
       │
       ├───────────────┬───────────────┐
       ▼               ▼               ▼
   INSURANCE         BNPL         ACCESSORIES
```

Potential services include:

### Device Trade-In

Customers trade existing devices for store credit.

### Buy Now Pay Later

Customers purchase devices through supported BNPL providers.

### Device Financing

Eligible customers finance devices over longer periods.

### Repairs

Customers book device repairs through the platform.

### Insurance

Customers purchase device protection or insurance.

### Refurbished Marketplace

Certified refurbished devices can be sold alongside new products.

### Business Accounts

Businesses can purchase devices in bulk and manage organizational orders.

---

# 29. Engineering Principles

The project should follow these principles:

### Backend First

Business-critical decisions are made by the backend.

### Provider Neutrality

External integrations such as payments and delivery providers should be abstracted behind internal services.

### Auditability

Important changes to payments, inventory and orders should be traceable.

### Security by Design

Authentication, authorization, validation and payment security are architectural requirements rather than afterthoughts.

### Mobile First

The storefront must provide a strong experience on mobile devices.

### Scalability

Modules should remain independently maintainable as the ecosystem grows.

### Testability

Services and integrations should be designed so that unit, integration, API and end-to-end testing can be introduced without major architectural changes.

---

# 30. Testing Strategy

Testing should cover:

```text
Unit Tests
      ↓
Service Tests
      ↓
GraphQL API Tests
      ↓
Integration Tests
      ↓
Payment Integration Tests
      ↓
Database Validation
      ↓
Frontend Component Tests
      ↓
End-to-End Tests
```

Critical automated coverage should prioritize:

* Authentication
* Pricing
* Inventory
* Cart calculations
* Checkout
* Payment initialization
* Payment verification
* Webhooks
* Duplicate payment prevention
* Order creation
* Stock reservation
* Order status transitions
* Refunds
* Admin authorization

---

# 31. Project Status

```text
Status: Planning / Architecture
Version: 0.1.0
```

Initial development priorities:

```text
Architecture
    ↓
Database Schema
    ↓
Authentication
    ↓
Product Catalogue
    ↓
Inventory
    ↓
Cart
    ↓
Checkout
    ↓
Payments
    ↓
Orders
    ↓
Admin Portal
    ↓
Testing
    ↓
Production Deployment
```

---

# 32. Vision

The vision is to create a scalable digital technology-commerce ecosystem where customers can **discover, purchase, finance, trade, protect and maintain their devices from one platform**.

The first release focuses on delivering a reliable commerce foundation for phones, laptops and accessories.

Future releases will expand the platform into a broader device ownership ecosystem encompassing trade-ins, financing, repairs, insurance, refurbished devices and business services.
