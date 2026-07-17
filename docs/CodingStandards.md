# Coding Standards & Conventions

This document defines the coding style, compiler constraints, naming conventions, and linting rules enforced across the monorepo.

---

## 1. Code Formatting & Linting

### 1.1. Prettier Formatting
Prettier is used to enforce a consistent formatting style. The following rules are configured in `.prettierrc`:
*   **Semi-colons**: Disabled (`"semi": false`).
*   **Quotes**: Single quotes (`"singleQuote": true`).
*   **Indentation**: 2 spaces (`"tabWidth": 2`).
*   **Line Endings**: LF (`"endOfLine": "lf"`).
*   **Trailing Commas**: ES5 compliant (`"trailingComma": "es5"`).
*   **Line Width**: Maximum 100 characters (`"printWidth": 100`).

### 1.2. ESLint Static Analysis
We use ESLint 9 Flat Configs.
*   Run the linter workspace-wide using: `pnpm run lint`.
*   Run auto-fix using: `pnpm run lint:fix`.

---

## 2. TypeScript Guidelines

### 2.1. Strict Compiler Enforcement
All packages inherit from `@dtc/typescript-config/base.json` which enforces:
*   `"strict": true` (includes `noImplicitAny`, `strictNullChecks`, etc.).
*   `"forceConsistentCasingInFileNames": true`.
*   `"isolatedModules": true`.

### 2.2. Best Practices
*   **Avoid `any`**: Do not use `any`. Use `unknown` or define an interface if structure is uncertain.
*   **Explicit Return Types**: Annotate return types on exported functions, React components, and async workflows to guarantee contract stability.
*   **Absolute Imports**: Prefer absolute path imports mapping to `@/*` rather than deeply nested relative paths (e.g. `import { x } from "@/components/x"` instead of `../../../../components/x`).

---

## 3. Naming Conventions

*   **Files & Directories**: Use kebab-case for filenames and folders (e.g., `product-card.tsx`, `use-checkout.ts`).
*   **React Components**: Use PascalCase (e.g., `ProductDetail.tsx`).
*   **Functions & Variables**: Use camelCase (e.g., `getProductDetails()`, `totalAmount`).
*   **TypeScript Types/Interfaces**: Use PascalCase (e.g., `interface CartItem {}`, `type LineItem = {}`).
*   **Database Entities & Schema**: Use snake_case for DB columns, foreign keys, and raw table schemas (standard for Medusa v2 modules).

---

## 4. Medusa v2 Best Practices

*   **Workflows**: Define complex operations (e.g., orders, refunds) inside `src/workflows/`. Avoid putting business transactions directly into API route handlers.
*   **Modules**: Keep data boundaries decoupled. Build dedicated modules under `src/modules/` when exposing custom tables.
*   **Links**: Link different database tables together using the Medusa Link module in `src/links/` rather than raw relational foreign-key bindings.

---

## 5. Commit Guidelines

We use conventional commit rules enforced by `commitlint`. Commits must follow this structure:

```text
<type>(<scope>): <short description>
```

### 5.1. Common Types
*   `feat`: A new user-facing feature.
*   `fix`: A bug fix.
*   `docs`: Documentation changes only.
*   `style`: Code changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
*   `refactor`: A code change that neither fixes a bug nor adds a feature.
*   `test`: Adding missing tests or correcting existing tests.
*   `chore`: Changes to the build process, tooling, or documentation generation.

### 5.2. Example Commit Message
```text
feat(storefront): integrate cart checkout page with medusa payment workflow
```
