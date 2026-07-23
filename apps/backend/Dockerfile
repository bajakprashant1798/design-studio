FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@11.1.2

WORKDIR /app

# Copy monorepo config files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy workspace dependencies
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

# Copy backend application
COPY apps/backend ./apps/backend

# Install dependencies and compile code
RUN pnpm install --frozen-lockfile
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN pnpm --filter=@dtc/backend build

# Runner stage
FROM node:22-alpine AS runner
RUN npm install -g pnpm@11.1.2
WORKDIR /app

# Copy all build outputs from compiler stage
COPY --from=base /app ./

EXPOSE 9000
ENV PORT=9000
ENV NODE_ENV=production

# Migrate database, seed user and publishable key, then start the server
CMD ["sh", "-c", "pnpm --filter=@dtc/backend exec medusa db:migrate && (pnpm --filter=@dtc/backend exec medusa user --email bajakprashant1998@gmail.com --password 12345678 || true) && cd apps/backend/.medusa/server && (npx medusa exec ./src/scripts/create-key.js || true) && npx medusa start"]
