# Production Deployment Guide

This document describes the compilation pipeline, container configurations, and environment adjustments required for deploying the Design Studio monorepo to production.

---

## 1. Production Build Pipeline

To build the entire monorepo stack:

```bash
# Sourcing LTS node version
source ~/.nvm/nvm.sh
nvm use --lts

# Generate production bundles for all applications
pnpm run build
```

Turborepo compiles both the storefront and the backend.

- **Backend**: Generates the runtime files under `apps/backend/.medusa/server/`.
- **Storefront**: Outputs standalone bundles in `apps/storefront/.next/standalone/`.

---

## 2. Containerized Deployment via Docker

We provide production-grade `Dockerfiles` for each application, along with a compose coordinator in `infra/docker-compose.prod.yml`.

To compile images and launch the full stack locally in production mode:

```bash
docker compose -f infra/docker-compose.prod.yml up -d --build
```

### 2.1. Standalone Optimizations

- The storefront Docker image utilizes Next.js standalone mode.
- It copies only absolute dependencies needed to run `server.js` without copying the massive workspace-wide `node_modules` folders, resulting in ~100MB production run images.

---

## 3. Production Environment Variables Checklist

Ensure these variables are securely injected at the hosting tier (e.g. AWS ECS, GCP Cloud Run, or Kubernetes Secrets):

### 3.1. Medusa Backend Service

- `DATABASE_URL`: Connection string to your production PostgreSQL database.
- `REDIS_URL`: Connection string to your production Redis cache/broker instance.
- `JWT_SECRET`: High-entropy secret token (do not use default templates).
- `COOKIE_SECRET`: High-entropy cookie session secret.
- `STORE_CORS`: Whitelisted production storefront URL origin (e.g. `https://designstudio.com`).
- `ADMIN_CORS`: Whitelisted origin URL of the deployed administration console dashboard.
- `AUTH_CORS`: Whitelisted authentication callback domains.

### 3.2. Storefront Service

- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`: Public-facing API URL of your deployed backend endpoint (e.g. `https://api.designstudio.com`).

---

## 4. Production CI Readiness Checks

Before releasing code to production, the continuous integration pipeline enforces:

1.  **Format Check**: Code passes prettier style validation.
2.  **Lint Check**: Zero syntax or rule errors in ESLint.
3.  **Type Check**: Zero compile/type errors in TS compiler checks.
4.  **Tests**: Unit and integration test suites pass successfully.
5.  **Build Validation**: Turborepo compile tasks return code 0.
