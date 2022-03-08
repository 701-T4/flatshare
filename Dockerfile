FROM node:16-alpine

WORKDIR /platform
COPY . /platform
RUN yarn install
CMD [ "yarn", "run", "test" ]