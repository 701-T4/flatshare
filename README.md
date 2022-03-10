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

Ensure license-report is installed as a global dependency:
Run `npm install -g license-report`

To generate LICENSE-3RD-PARTY.txt:
Run `yarn run generate:license-report`

Ensure to run the command three times, one for the entire project, one for the front-end project and one for the back-end project. Before running the command, please ensure to change to the corresponding repositories using the `cd <relative path>` command.

Note: When generating the files for the front-end and back-end projects, please manually add the `license-report-config.json` to the same directory as `package.json`.

For further information on utilising the license-report package, please visit https://github.com/ironSource/license-report.

## Attributing resources

If you have used any images or other resources that belongs to someone else, please attribute them appropriately in the `ATTRIBUTIONS.txt`.
