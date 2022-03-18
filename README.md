# Platform

Core repository for the platform team 4 is developing

# Quick Start

0. Ensure you have NodeJS 16.x installed and it is your current node executable.
1. Run `yarn` to fetch dependencies.
2. Run `yarn run start:dev` to simultaneously run the frontend and backend.

# Running with Docker

Running with Docker will ensure that users can quickly get environment up and running so they can quickly iterate on work. The application will work regardless of operating system and configuration.

## Web app

Ensure you have set up backend env files first. Checkout backend README for more info.

1. Run `yarn run start:docker` to simultaneously run the frontend and backend in docker containers.

## Tests

1. Run `yarn run test:docker` to simultaneously run the frontend and backend tests in docker containers.

For more detail, view `CONTRIBUTING.md`.

# How to attribute

## Attributing third party dependencies

All third party dependencies used in this project are attributed in the LICENSE-3RD-PARTY files. The files are generated automatically when there is an update to the dependecies used.

To mannually generate a LICENSE-3RD-PARTY.md:
Run `yarn run license-report`

For further information on the license-report-generator package, please visit npmjs.com/package/@wbmnky/license-report-generator.

## Attributing resources

If you have used any images or other resources that belongs to someone else, please attribute them appropriately in the `ATTRIBUTIONS.md`.
