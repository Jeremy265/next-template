FROM registry.roqs.basf.net/base-images/node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update

# Bundle app source
COPY . /usr/src/app/
RUN npm install -g npm@latest
RUN npm ci
RUN npm run build 

RUN chmod -R 777 /usr/src/app/.next/server/app/
RUN mkdir -p /usr/src/app/.next/cache/fetch-cache
RUN touch /usr/src/app/.next/cache/fetch-cache/tags-manifest.json
RUN chmod -R 777 /usr/src/app/.next/cache/fetch-cache

# Clear the cache
RUN npm cache clean --force

EXPOSE 5000
CMD [ "npm", "run", "start" ]