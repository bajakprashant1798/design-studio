# Monorepo Folder Structure Documentation

This document explains the monorepo directory layout, mapping the structural boundaries and locations of application layers, shared modules, and developer tooling.

---

## 1. Directory Tree Layout

Below is the directory mapping of the Design Studio workspace:

```text
design-studio/
├── .github/                   # CI/CD Workflows
│   └── workflows/
│       └── ci.yml             # Github Actions CI Configuration
├── .husky/                    # Git Hooks
│   └── pre-commit             # Run lint-staged on commit
├── .vscode/                   # VS Code configuration
│   ├── extensions.json        # Recommended extensions list
│   └── settings.json          # Editor rules & formatter defaults
├── apps/                      # Executable Applications
│   ├── backend/               # Medusa v2 E-Commerce Backend
│   │   ├── src/               # Medusa source directories
│   │   │   ├── admin/         # Admin custom components & widgets
│   │   │   ├── api/           # API routes & custom endpoints
│   │   │   ├── jobs/          # Background cron jobs
│   │   │   ├── links/         # Data module link definitions
│   │   │   ├── modules/       # Medusa custom data modules
│   │   │   ├── subscribers/   # Event handlers & message consumers
│   │   │   └── workflows/     # Business logic workflow pipelines
│   │   ├── Dockerfile         # Multi-stage backend build file
│   │   ├── medusa-config.ts   # Medusa server config
│   │   ├── tsconfig.json      # Node-specific extended TSConfig
│   │   └── eslint.config.ts   # Backend eslint config
│   └── storefront/            # Next.js 15 App Router Frontend
│       ├── app/               # App Router pages and assets
│       ├── public/            # Static assets
│       ├── Dockerfile         # Multi-stage storefront build file
│       ├── next.config.ts     # Next.js server configuration
│       ├── tsconfig.json      # Next.js extended TSConfig
│       └── eslint.config.mjs  # Storefront eslint config
├── docs/                      # Technical Documentation Suite
│   ├── Architecture.md
│   ├── Setup.md
│   ├── FolderStructure.md
│   ├── CodingStandards.md
│   ├── DevelopmentGuide.md
│   └── Deployment.md
├── infra/                     # Infrastructure configurations
│   ├── docker-compose.yml     # Local database and redis setup
│   └── docker-compose.prod.yml# Production stack orchestration
├── packages/                  # Shared Configuration Workspace Packages
│   ├── eslint-config/         # Reusable flat ESLint rules
│   │   ├── base.js            # Base ignores & rules
│   │   ├── next.js            # Next.js profile
│   │   └── medusa.js          # Medusa profile
│   └── typescript-config/     # Reusable compiler options
│       ├── base.json          # Shared standard strict rules
│       ├── nextjs.json        # Next.js compile targets
│       └── node.json          # Medusa/Node compiler options
├── .editorconfig              # Code formatting styles for IDEs
├── .gitignore                 # Root global gitignore rules
├── .npmrc                     # Workspace dependency resolution configs
├── .prettierignore            # Files bypassed by prettier formatting
├── .prettierrc                # Project Prettier configurations
├── commitlint.config.js       # Commit message linting conventions
├── eslint.config.ts           # Root workspace linting settings
├── package.json               # Root project scripts & workspace links
├── pnpm-workspace.yaml        # pnpm workspaces definition
└── turbo.json                 # Turborepo task pipeline rules
```

---

## 2. Directories & Package Definitions

### 2.1. apps/
*   **`backend`**: Holds the Medusa v2 engine. Uses TypeScript, compiling to `.medusa/server` for execution. Connects to PostgreSQL (relational storage) and Redis (caching and event bus).
*   **`storefront`**: A Next.js 15 application. It uses React 19 and Tailwind CSS v4 to query and display product listings, manage shopping carts, and handle customer checkouts.

### 2.2. packages/
*   **`typescript-config`**: Standardized TS configurations. Apps import target profiles (like `@dtc/typescript-config/nextjs.json`) to keep local compile targets identical.
*   **`eslint-config`**: Houses ESLint 9 configuration templates. Reuses Next.js lint configurations and Medusa's recommended rules to maintain clean code patterns.

### 2.3. infra/
*   **Local Infrastructure (`docker-compose.yml`)**: Spins up containers for PostgreSQL and Redis to build locally without managing binary versions locally on the machine.
*   **Production Infrastructure (`docker-compose.prod.yml`)**: Builds the Dockerfiles in each application directory and orchestrates a local testing setup matching standard Kubernetes or server deployments.
