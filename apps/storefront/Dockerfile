# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm@11.1.2

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ ./packages/
COPY apps/storefront/package.json ./apps/storefront/

RUN pnpm install --frozen-lockfile --filter=@dtc/storefront...

COPY apps/storefront/ ./apps/storefront/

RUN pnpm --filter=@dtc/storefront build

# Stage 2: Production Run
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/apps/storefront/public ./public
COPY --from=builder /app/apps/storefront/.next/standalone/apps/storefront ./
COPY --from=builder /app/apps/storefront/.next/standalone/node_modules ./node_modules
COPY --from=builder /app/apps/storefront/.next/static ./apps/storefront/.next/static
COPY --from=builder /app/apps/storefront/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
