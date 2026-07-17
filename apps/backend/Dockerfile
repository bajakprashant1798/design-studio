# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN apk add --no-cache python3 make g++ gcc libc-dev
RUN npm install -g pnpm@11.1.2

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ ./packages/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --filter=@dtc/backend...

COPY apps/backend/ ./apps/backend/

RUN pnpm --filter=@dtc/backend build

# Stage 2: Production Run
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm@11.1.2

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ ./packages/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --prod --frozen-lockfile --filter=@dtc/backend...

COPY --from=builder /app/apps/backend/.medusa /app/apps/backend/.medusa
COPY --from=builder /app/apps/backend/medusa-config.ts /app/apps/backend/medusa-config.ts

EXPOSE 9000

CMD ["pnpm", "--filter", "@dtc/backend", "start"]
