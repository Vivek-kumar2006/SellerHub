SellerHub — User Management API

A production-grade User Management backend built with TypeScript, Express, and PostgreSQL — designed around the same auth, authorization, and validation patterns used in real fintech and marketplace backends (Razorpay, PhonePe, Groww).

Live API · Swagger Docs · Postman Collection

Overview

SellerHub is a self-contained authentication and user-management service. It goes beyond a typical CRUD tutorial by implementing the pieces that actually get tested in backend interviews: refresh token rotation, role-based access control, layered service architecture, and defensive error handling — all fully typed and validated at runtime.

Features
JWT authentication with short-lived access tokens and long-lived refresh tokens
Refresh token rotation — tokens are persisted in PostgreSQL, not just trusted as stateless JWTs, so individual sessions can be revoked
Role-based access control (RBAC) — USER / ADMIN roles enforced via middleware, independent of authentication
Runtime request validation with Zod, generating TypeScript types from a single schema
Redis-backed rate limiting (sliding window) on the login endpoint to mitigate brute-force attempts
Centralized error handling — no raw stack traces ever reach the client
Soft delete — user records are deactivated, never destroyed, preserving referential integrity
Swagger/OpenAPI documentation for every endpoint
Tech Stack
Layer	Technology
Language	TypeScript
Framework	Express.js
Database	PostgreSQL
ORM	Prisma
Cache / Rate Limiting	Redis
Validation	Zod
Auth	JSON Web Tokens (jsonwebtoken), bcrypt
Docs	Swagger (OpenAPI 3.0)
Deployment	Railway
Architecture
Client
  │
  ▼
Express API Layer
  ├── Middleware   (JWT auth → RBAC → Zod validation)
  └── Routes       (auth · user · admin)
  │
  ▼
Service Layer      (business logic)
  │
  ▼
PostgreSQL (via Prisma)   +   Redis (rate limiting)

Requests flow through a strict pipeline: authenticate → authorize → validate → execute, in that exact order. RBAC middleware always runs after JWT verification, since it depends on req.user being populated — reversing this order is a common bug this project deliberately guards against.

API Endpoints
Method	Endpoint	Access	Description
POST	/api/v1/auth/register	Public	Register a new user
POST	/api/v1/auth/login	Public (rate-limited)	Login, returns access + refresh token
POST	/api/v1/auth/refresh	Public	Rotate refresh token, issue new access token
POST	/api/v1/auth/logout	Authenticated	Revoke refresh token
GET	/api/v1/users/me	Authenticated	Get own profile
PATCH	/api/v1/users/me	Authenticated	Update own profile
PATCH	/api/v1/users/me/password	Authenticated	Change password
DELETE	/api/v1/users/me	Authenticated	Deactivate own account (soft delete)
GET	/api/v1/admin/users	Admin only	Paginated list of all users
PATCH	/api/v1/admin/users/:id/role	Admin only	Update a user's role
GET	/health	Public	Health check
GET	/api-docs	Public	Swagger UI

Full request/response schemas are documented in Swagger.

Why These Decisions

Refresh tokens live in the database, not just in the JWT payload. A purely stateless JWT can't be revoked before it expires. Storing the refresh token server-side means logging out — or an admin flagging a compromised account — actually terminates that session immediately, instead of waiting up to 7 days.

RBAC is a separate middleware from authentication. Authentication answers "who are you?" Authorization answers "what are you allowed to do?" Keeping them as two composable middlewares (authenticate → requireRole('ADMIN')) means new roles or permission rules can be added without touching the JWT verification logic at all.

Rate limiting checks count === 1 before setting EXPIRE. Calling EXPIRE on every request would keep sliding the rate-limit window forward indefinitely, defeating its purpose. Setting it only on the first request in a window guarantees a fixed, predictable reset period.

Soft delete instead of hard delete. Destroying a User row outright risks orphaning related records and breaking foreign-key constraints. Flipping isActive to false preserves data integrity while still fully blocking that user from authenticating.

Getting Started
Prerequisites
Node.js ≥ 18
PostgreSQL instance (local or hosted)
Redis instance (local or hosted)
Setup
bash
git clone https://github.com/your-username/sellerhub-api.git
cd sellerhub-api
npm install

cp .env.example .env
# fill in DATABASE_URL, REDIS_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET

npx prisma migrate dev
npx prisma db seed

npm run dev

The API runs at http://localhost:5000 by default. Swagger docs are available at http://localhost:5000/api-docs.

Environment Variables
env
DATABASE_URL=postgresql://user:password@localhost:5432/sellerhub
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
PORT=5000
Demo Credentials (seeded)
Role	Email	Password
Admin	admin@sellerhub.com	Admin@123
User	user@sellerhub.com	User@123
Project Structure
src/
├── config/         # env validation, swagger setup
├── middlewares/     # auth, rbac, validation, error handling, rate limiting
├── modules/
│   ├── auth/       # register, login, refresh, logout
│   └── user/       # profile CRUD, admin user management
├── utils/          # JWT, bcrypt, ApiError, ApiResponse
├── lib/            # Prisma & Redis clients (singletons)
├── app.ts
└── server.ts
Testing the API

A Postman collection covering every endpoint — including expected failure cases (duplicate email, wrong role, expired token, rate-limit exceeded) — is included at sellerhub.postman_collection.json.

Roadmap
 OAuth2 (Google login)
 Redis-based token blacklisting for immediate access-token revocation
 Multi-factor authentication

Built by [Your Name] · LinkedIn · X/Twitter
