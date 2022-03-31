# Guide

Welcome to the frontend codebase!

In order to effectively contribute to the frontend, you should read the [contributing guide](https://github.com/701-T4/platform/wiki/React-Code-Conventions) on our wiki.

To start developing with the frontend, you should run the `npm run start:dev` script at the project root. Make sure you install dependencies (i.e. `yarn`) at the project root first.

To generate Generate TypeScript interfaces from swagger documents for API Request, you should run the `npm run generate:api-types` script in the `project/frontend`. Make sure that the api http://localhost:4200/api-json is running.

To run all the generators for frontend, you should run `npm run generate` script in the `project/frontend`. Make sure that the api http://localhost:4200/api-json is running.

For prebuilt UI components, you can use the NextUI package. More custom components can be build using TailwindCSS combined with the classnames package.

# Running with Docker

Running with Docker will ensure that users can quickly get environment up and running so they can quickly iterate on work. The application will work regardless of operating system and configuration.

1. Download [Docker Desktop or Docker (for Linux)](https://docs.docker.com/get-docker/).
2. Ensure you have Docker running. You can set it to run on device startup in Docker Desktop so you can forget about it. If you are unable to install Docker Desktop, you can use the command `dockerd` to start Docker.
3. Build the Docker image using `docker build -f Dockerfile -t frontend .`
4. Run `docker run -it -p 80:3000 frontend` to run the frontend in a docker container.

# Testing with Cypress

To start running tests, ensure Cypress is installed locally as a dev dependency.

```bash
$ yarn add cypress --dev
```

## Running tests

There are two methods to run frontend integration tests.

1. Run tests using Cypress Test Runner

```bash
$ yarn run cypress open
```

2. Run all tests from the command line

```bash
$ yarn run cypress run
```

## Configurations

Current configurations set Cypress to not take screenshots on test fails nor capture video of tests during `yarn run cypress run`.

To change or add to these configurations, modify `cypress.json`.
