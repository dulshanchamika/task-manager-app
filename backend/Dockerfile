# ---- Development/Production Stage ----
FROM node:20-slim

WORKDIR /app

# Install openssl for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

EXPOSE 5000

# Run db push then start server
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node src/index.js"]
