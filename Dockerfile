FROM oven/bun:1 AS build
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:1 as prod
COPY --from=build /app/.output /app
WORKDIR /app
EXPOSE 3000
CMD ["bun", "server/index.mjs"]