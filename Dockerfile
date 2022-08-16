FROM node:16.16

WORKDIR /

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD ["node", "server.js"]