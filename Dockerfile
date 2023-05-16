FROM node:16

# Create app directory
WORKDIR /usr/src/camviewerplus

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 6900
EXPOSE 6980

CMD [ "npm", "run", "start-prod" ]