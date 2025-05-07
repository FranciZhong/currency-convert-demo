# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy and build the application
COPY . .
RUN pnpm run build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Install pnpm in runner stage
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only necessary files from builder
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

ENV NODE_ENV=production

EXPOSE 3000
CMD ["pnpm", "start"]