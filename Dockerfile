FROM node:23-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build

FROM node:23-alpine AS prod
COPY --from=build /usr/src/app/.output /app
WORKDIR /app
EXPOSE 3000
CMD ["node", "server/index.mjs"]