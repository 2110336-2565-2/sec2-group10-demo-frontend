FROM node:18-alpine AS base
ENV CI 1
RUN npm install -g pnpm

FROM base as deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY . .

RUN pnpm run build

FROM deps AS prod-deps

RUN pnpm prune --prod

FROM base AS prod

ENV NODE_ENV production
WORKDIR /app

COPY --from=prod-deps /app/package.json ./package.json
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["pnpm", "start"]


