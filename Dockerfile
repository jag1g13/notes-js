###################
# Build environment
FROM node:current-slim as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY public public
COPY src src

RUN npm run build-front


########################
# Production environment
FROM node:current-slim

RUN apt-get update && apt-get install -y git openssh-client

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY server server
COPY --from=build /app/build build

EXPOSE 8080

ENV NOTES_REPO_DIR=/notes
ENV NOTES_DIR=/notes/days
ENV SERVER_PORT=8080

ENV NODE_ENV=production

CMD [ "node", "server/server.js" ]
