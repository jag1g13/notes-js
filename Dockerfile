FROM node:current-alpine

RUN apk add --no-cache git

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

ENV NOTES_REPO_DIR=/notes
ENV NOTES_DIR=/notes/days
ENV PORT=8080

CMD [ "node", "app/app.js" ]
