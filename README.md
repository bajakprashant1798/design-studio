# Design Studio Monorepo Starter

A production-grade, highly-scalable monorepo starter powered by **Medusa v2**, **Next.js 15 App Router**, **TypeScript**, and **Turborepo** using **pnpm workspaces**.

---

## 🌟 Technology Stack

- **E-Commerce Core**: Medusa v2 (with admin panel, relational DB module linkages, and event pub/sub system)
- **Storefront**: Next.js 15 App Router (utilizing React 19 and Tailwind CSS v4)
- **Monorepo Engine**: Turborepo
- **Package Manager**: `pnpm` (Workspace configured)
- **Infrastructure**: PostgreSQL 16 & Redis 7 (orchestrated via Docker Compose)
- **Developer Tooling**: ESLint 9, Prettier, Commitlint, Husky, lint-staged

---

## 📁 Repository Layout

```text
design-studio/
├── apps/
│   ├── backend/         # Medusa v2 e-commerce engine
│   └── storefront/      # Next.js 15 App Router client storefront
├── packages/
│   ├── eslint-config/   # Shared flat ESLint 9 rules
│   └── typescript-config/# Shared base and target compiler configs
├── docs/                # Comprehensive technical documentation suite
└── infra/               # PostgreSQL & Redis docker setups
```

---

## 📖 Documentation Index

Please consult our detailed technical guides located in the `/docs` directory for deployment, setup, and architectural details:

1.  **[Architecture Guide](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/Architecture.md)**: Details package boundaries, topological relationships, and database schema layouts.
2.  **[Setup Guide](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/Setup.md)**: Outlines prerequisites, local environment variable setups, database migrations, and seeding keys.
3.  **[Folder Structure Guide](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/FolderStructure.md)**: Explains the directory paths and workspace locations.
4.  **[Coding Standards](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/CodingStandards.md)**: Outlines Prettier options, strict type rules, naming conventions, and Conventional Commits format.
5.  **[Developer & Workflow Guide](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/DevelopmentGuide.md)**: Guide for daily tasks, module creation, migration generates, and dependency updates.
6.  **[Deployment Guide](file:///Users/prashant/Documents/freelancing%20projects/medusa/design-studio/docs/Deployment.md)**: Detailed checklist for production image builds, multi-stage standalone caching, and server docker compose runs.

---

## 🚀 Quick Start (Local Development)

### 1. Sourcing Node.js LTS

pnpm requires the Node.js LTS release. Use `nvm` to select it:

```bash
source ~/.nvm/nvm.sh
nvm use --lts
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Spin up local database and redis services

```bash
docker compose -f infra/docker-compose.yml up -d
```

### 4. Create and update env files

```bash
cp apps/backend/.env.template apps/backend/.env
cp apps/storefront/.env.template apps/storefront/.env
```

### 5. Seeding the Backend DB

```bash
pnpm --filter=@dtc/backend run build
pnpm --filter=@dtc/backend run seed
```

### 6. Run the Dev Servers

```bash
pnpm run dev
```

- **Next.js Storefront**: [http://localhost:3000](http://localhost:3000)
- **Medusa Core API**: [http://localhost:9000](http://localhost:9000)
- **Medusa Admin Dashboard**: [http://localhost:9000/app](http://localhost:9000/app)

---

## 🛠️ Main Workspace Scripts

- `pnpm run dev`: Launch all applications in parallel developer mode.
- `pnpm run build`: Build all application bundles.
- `pnpm run lint`: Static analysis code check using ESLint.
- `pnpm run lint:fix`: Format and auto-fix linter code warnings.
- `pnpm run typecheck`: Type check files in TypeScript.
- `pnpm run clean`: Safely drop cached folders, builds, and `node_modules` paths.
- `pnpm run test`: Run the test suites.
