FROM node:16-alpine

WORKDIR /platform/packages/frontend
COPY . /platform/packages/frontend
RUN yarn install
CMD [ "yarn", "run", "start" ]

EXPOSE 80