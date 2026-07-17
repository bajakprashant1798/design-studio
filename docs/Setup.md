# Installation & Local Setup Guide

This document describes how to configure, run, and seed the monorepo workspace for development.

---

## 1. Prerequisites

Before starting, ensure you have the following installed:

*   **Node.js**: Version 22 (LTS is required).
*   **Package Manager**: `pnpm` (installed globally: `npm install -g pnpm@11.1.2`).
*   **Containerization**: `Docker` and `Docker Compose` (to run Postgres and Redis).
*   **Version Control**: `git`.

---

## 2. Setting Up Node & Dependencies

If you are using Node Version Manager (`nvm`), configure the active shell to use the LTS node version (pnpm requires this compatibility layer):

```bash
# Activate NVM and choose LTS Node
source ~/.nvm/nvm.sh
nvm use --lts

# Install the dependencies from the monorepo root
pnpm install
```

---

## 3. Launching Local Services (PostgreSQL & Redis)

Start the local Docker containers for PostgreSQL 16 and Redis 7:

```bash
docker compose -f infra/docker-compose.yml up -d
```

This spins up:
*   PostgreSQL database: `medusa` on port `5432` with credentials `medusa` / `medusa`.
*   Redis server: Port `6379`.

---

## 4. Configuring Environment Variables

Create local environment configuration files using the provided templates:

### 4.1. Medusa Backend
Navigate to `apps/backend/` and copy the template:
```bash
cp apps/backend/.env.template apps/backend/.env
```

Ensure the contents look correct (local Postgres points to `localhost:5432/medusa-design-studio` by default):
```ini
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000,http://localhost:5173
AUTH_CORS=http://localhost:3000,http://localhost:9000,http://localhost:5173
DATABASE_URL=postgres://medusa:medusa@localhost:5432/medusa-design-studio
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
```

### 4.2. Next.js Storefront
Navigate to `apps/storefront/` and copy the template:
```bash
cp apps/storefront/.env.template apps/storefront/.env
```

Ensure the backend API URL matches the local backend port:
```ini
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## 5. Database Seeding & Setup

Run the migrations and seed the Medusa e-commerce backend:

```bash
# Run database migrations and seeding
pnpm --filter=@dtc/backend run build
pnpm --filter=@dtc/backend run seed
```

---

## 6. Running the Development Server

Start both the Medusa backend and Next.js storefront servers concurrently:

```bash
pnpm run dev
```

*   **Medusa Admin Dashboard**: [http://localhost:9000/app](http://localhost:9000/app)
*   **Medusa Store API**: [http://localhost:9000](http://localhost:9000)
*   **Next.js Storefront**: [http://localhost:3000](http://localhost:3000)
