
SellerHub — Core Backend & Authentication Engine
A production-grade authentication and identity backend built with Node.js, Express, TypeScript, and Prisma ORM. This service establishes the security, role modeling, and session lifecycle foundation for an enterprise multi-vendor marketplace platform.

Tech Stack
 Runtime & Framework: 
 Node.js, Express.js (TypeScript)
 Database & ORM: PostgreSQL, Prisma ORM
 Authentication & Security: JSON Web Tokens (JWT), HTTP-only Cookies, Bcrypt,CORS
 Validation & Error Handling: Zod Schema Validation, Custom ApiError Middleware

Implemented Architecture & Features
1. Dual-Token JWT Authentication (HTTP-only Cookies)
   Access & Refresh Lifecycle: Issues short-lived access tokens alongside long-lived refresh tokens upon login.
   Cookie-Based Security: Tokens are transmitted and stored in HTTP-only cookies to eliminate client-side JavaScript access and mitigate XSS-based token theft.
   Token Rotation Endpoint: Implemented a dedicated token refresh route that validates the incoming refresh token signature against a decoupled secret key and re-issues authentication state.
   Clean Session Termination: A dedicated logout pipeline that invalidates client credentials by clearing active authentication cookies.
2. Relational Schema & Identity Modeling (Prisma)
   Role Modeling: Integrated enum-level roles (CUSTOMER, SELLER, ADMIN).
   State Verification Lifecycle: Model-level VerificationStatus (PENDING, APPROVED, REJECTED) to track seller onboarding compliance.
   Relational Extensions: Schema definitions for User, SellerProfile (business identity metadata), and AuditLog (compliance trail tracking).
3. Middleware & Pipeline Safety
   Request Payload Validation: Generic validate() middleware leveraging Zod schemas to reject malformed request bodies before hitting controllers.
   Centralized Error Handling: Custom ApiError class coupled with a terminal Express error middleware to standardize API error payloads and HTTP status codes.
   CORS & DevTools Support: Configured credential-safe CORS reflection for local testing environments and handled Chrome DevTools internal CSP discovery pings.

Implemented Endpoints
Authentication Module (/api/v1/auth)
Method           Endpoint        Description             AuthPayloadPOST/
api/v1/auth/register  Registers a new account with role assignment  Body: { email, password, role }POST/api/v1/auth/loginAuthenticates credentials and sets HTTP-only cookiesBody: { email, password } $\rightarrow$ Sets accessToken & refreshTokenPOST/api/v1/auth/refreshValidates refresh token and renews auth credentialsCookie: refreshToken=...POST/api/v1/auth/logoutClears active authentication cookiesCookie: refreshToken=...Project StructurePlaintextsrc/
├── lib/
│   └── prisma.ts                 # Prisma Client instance
├── middlewares/
│   └── validate.middleware.ts    # Zod schema validation middleware
├── modules/
│   └── auth/
│       ├── auth.controller.ts    # Register, login, refresh, and logout handlers
│       ├── auth.routes.ts        # Express router definitions for /auth
│       └── auth.schema.ts        # Zod validation schemas
├── types/
│   └── express.d.ts              # Extended Express Request definitions
├── utils/
│   ├── ApiError.ts               # Custom error abstraction & global handler
│   └── jwt.ts                    # Token signing and verification logic
└── app.ts                        # Express application entry point & CORS configuration
prisma/
└── schema.prisma                 # Data models (User, SellerProfile, AuditLog, Enums)
Local Setup & Environment1. PrerequisitesNode.js (v18+)PostgreSQL instance running locally or via Docker2. Environment VariablesCreate a .env file in the project root:Code snippetPORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/sellerhub?schema=public"

ACCESS_TOKEN_SECRET="your_access_token_secret_key"
REFRESH_TOKEN_SECRET="your_refresh_token_secret_key"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"
3. Installation & RunBash# Install dependencies
npm install

# Push schema changes to PostgreSQL
npx prisma db push

# Generate Prisma Client types
npx prisma generate

# Start the development server
npm run dev
