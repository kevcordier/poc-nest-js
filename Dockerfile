FROM node:13-alpine

# Create app directory
WORKDIR /var/www/astronaut

COPY package*.json ./

RUN npm install

USER node:node

# Bundle app source
COPY . .

ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
