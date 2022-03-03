FROM node:alpine

WORKDIR /platform/packages/backend
COPY . /platform/packages/backend
RUN yarn install
CMD [ "yarn", "run", "start" ]