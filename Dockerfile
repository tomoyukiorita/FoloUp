# base image
FROM node:v20.10.0

# Create and change to the app directory.
WORKDIR /usr/app

# Copy application dependency mani fests to the container image.
# A wildcard is used to ensure copying both package. j son AND package-tock.json (when available) .
# Copying this first prevents re-running npm install on every code change.
COPY . .

# Install production dependenci es.
# If you add a package—lock. j son, speed your build by switching to 'npm ci
RUN yarn install --production

RUN yarn build

CMD [ "yarn", "start" ]