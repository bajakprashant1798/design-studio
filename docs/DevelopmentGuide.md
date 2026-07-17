# Developer & Workflow Guide

This guide outlines day-to-day routines, workflows, database migration management, dependency guidelines, and codebase maintenance workflows.

---

## 1. Daily Development Loop

To start working on the project, run:

```bash
# 1. Select Node LTS version
source ~/.nvm/nvm.sh
nvm use --lts

# 2. Spin up local database and redis containers
docker compose -f infra/docker-compose.yml up -d

# 3. Launch development server
pnpm run dev
```

The `pnpm run dev` command uses Turborepo to run `@dtc/backend` and `@dtc/storefront` concurrently.

---

## 2. Managing Dependencies

Because this project uses a pnpm monorepo workspace, **never** run generic `npm install` or run `pnpm install` inside subfolders without specifying filters.

### 2.1. Adding a Package to a Specific App

To install a dependency (e.g. `lodash`) into the storefront application:

```bash
pnpm --filter=@dtc/storefront add lodash
```

To install a developer tool (e.g. `@types/lodash`) as a devDependency in the storefront:

```bash
pnpm --filter=@dtc/storefront add -D @types/lodash
```

### 2.2. Adding a Package to all workspaces or Root

To install a global developer utility (e.g. `eslint-plugin-react`) at the workspace root:

```bash
pnpm add -Dw eslint-plugin-react
```

---

## 3. Database & Migrations (Medusa v2)

Medusa v2 manages its database schema using Medusa CLI migrations.

### 3.1. Generating a New Migration

When you create or update modules in `apps/backend/src/modules/`, generate a database migration script:

```bash
# Run medusa db migrations generator
pnpm --filter=@dtc/backend exec medusa db:generate <module-name>
```

### 3.2. Running Migrations

To apply outstanding migrations to your local PostgreSQL database:

```bash
pnpm --filter=@dtc/backend exec medusa db:migrate
```

### 3.3. Seeding the Database

To clear data and re-apply seed mock products, categories, and regions:

```bash
pnpm --filter=@dtc/backend run seed
```

---

## 4. Quality Control (Linting, Testing, Typechecking)

Run validations before pushing branches or opening Pull Requests:

```bash
# Lint the entire monorepo
pnpm run lint

# Auto-fix linting issues where possible
pnpm run lint:fix

# Check TypeScript compiler targets without emitting files
pnpm run typecheck

# Run unit and integration tests
pnpm run test
```

---

## 5. Cleaning Up Build Outputs

If you encounter dependency mismatches, typescript caching quirks, or lock file conflicts, execute:

```bash
# Clear compiled binaries, caches, and reinstall dependencies
pnpm run clean
pnpm install
```

This drops the root `.turbo` cache, `.next` builds, compiled `.medusa` servers, and all `node_modules` workspaces.
