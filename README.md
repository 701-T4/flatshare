# Platform

Core repository for the platform team 4 is developing

# Quick Start

0. Ensure you have NodeJS 16.x installed and it is your current node executable.
1. Run `yarn` to fetch dependencies.
2. Run `yarn run start:dev` to simultaneously run the frontend and backend.

**For more information regarding frontend and backend specific development, view the READMEs in their respective folders:**

- [Frontend](packages/frontend)
- [Backend](packages/backend)

# Running with Docker

Running with Docker will ensure that users can quickly get environment up and running so they can quickly iterate on work. The application will work regardless of operating system and configuration.

## Web app

Ensure you have set up backend env files first. Checkout backend README for more info.

1. Run `yarn run start:docker` to simultaneously run the frontend and backend in docker containers.

## Tests

1. Run `yarn run test:docker` to simultaneously run the frontend and backend tests in docker containers.

For more detail, view `CONTRIBUTING.md`.
