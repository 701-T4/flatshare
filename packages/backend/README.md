## Installation

1. Install packages

```bash
$ yarn install
```

2. Setup env files

```bash
$ cp ./.env.development.template ./.env.development
$ cp ./.env.production.template ./.env.production
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

# Running with Docker

Running with Docker will ensure that users can quickly get environment up and running so they can quickly iterate on work. The application will work regardless of operating system and configuration.

1. Download [Docker Desktop or Docker (for Linux)](https://docs.docker.com/get-docker/).
2. Ensure you have Docker running. You can set it to run on device startup in Docker Desktop so you can forget about it. If you are unable to install Docker Desktop, you can use the command `dockerd` to start Docker.
3. Build the Docker image using `docker build -f Dockerfile -t backend .`
4. Run `docker run -it -p 4200:4200 backend` to run the frontend in a docker container.

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```
