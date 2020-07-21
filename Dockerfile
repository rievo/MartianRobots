FROM node:alpine

## Set timezone
RUN apk add --no-cache tzdata
ENV TZ Europe/Madrid


## Create a new user without root permissions for security
RUN addgroup -S nodejs && adduser -S -G nodejs nodejs
USER nodejs

### Install the modules in the /tmp directory to use the caching in case of changes
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production

### Copy the modules in the new user's home directory to avoid permission issues
RUN mkdir -p /home/nodejs/app && cp -a /tmp/node_modules /home/nodejs/app/

### Change the work directory
WORKDIR /home/nodejs/app


### Copy all code files into the Docker
ADD . /home/nodejs/app

EXPOSE 8080

ENV DOCKER NO

CMD ["npm", "start"]