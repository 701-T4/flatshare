<h1 align="center">
  <br>
  <img src="./resources/logo-text.svg?raw=true&sanitize=true" alt="FlatShare" width="400">
</h1>

<h4 align="center">Flat management made simple.</h4>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/badge/license-MIT-blue">
  <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/701-T4/flatshare/PR%20Check?label=tests&logo=github&style=flat-square">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/701-T4/flatshare?style=flat-square">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/701-T4/flatshare?logo=github&style=flat-square">
</p>

<p align="center">
  <a href="#key-features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#contributing">Contributing</a> •
  <a href="https://github.com/701-T4/flatshare/wiki">Documentation</a> •
  <a href="https://github.com/701-T4/flatshare/wiki/Trouble-Shooting">Troubleshooting</a> •
  <a href="https://flat-split.web.app/">Demo</a>
</p>

> **Disclaimer**
>
> This is a project for the University of Auckland SE701 course (Team 4). It will likely not be maintained after completion of this course.

## Screenshots

<!--https://felixhayashi.github.io/ReadmeGalleryCreatorForGitHub/-->

<img src="./resources/sc-1.png?raw=true" width="50%" alt="dashboard screenshot"></img><img src="./resources/sc-2.png?raw=true" width="50%" alt="home screenshot"></img>
<img src="./resources/sc-3.png?raw=true" width="50%" alt="login screenshot"></img>

## Key Features

- Bill Splitting
- Chores Management
- Synchronised Notes

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js 16.x](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/getting-started/install) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/701-T4/flatshare

# Go into the repository
$ cd flatshare

# Install dependencies
$ yarn install
All third party dependencies used in this project are attributed in the LICENSE-3RD-PARTY files. The files are generated automatically when there is an update to the dependencies used.

# Run the app
$ yarn start
```

by default your application will be hosted at `http://localhost:3000`, while the
api will be hosted at `http://localhost:4200/api`. If using the Firebase auth
emulator, this will be hosted at `http://localhost:4000/auth`.These can be changed
in the config/environment values. See the `contributing` section below for more
details on running the app.

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Docker

A docker image has been provided that contains a full environment for running the application in. It can be used to quickly start running the app on any operating system.

Ensure you have set up backend env files first. Checkout backend [README](/packages/backend/README.md) for more info.

```bash
# Run Web App
yarn start:docker

# Run Tests
yarn test:docker
```

## Contributing

Contributions are always welcome!

See [`CONTRIBUTING.md`](/CONTRIBUTING.md) for ways to get started, as well as more detailed instructions on setting up and working with the repository.

Please adhere to this project's [`code of conduct`](/CODE_OF_CONDUCT.md).

## Documentation

This project is using [GitHub wiki](https://github.com/701-T4/flatshare/wiki) for documentation.

Swagger API documentation is available on `/api` for the backend. This can be found [here](https://flat-share-api.herokuapp.com/api) for the currently deployed backend.

## Tech Stack

**Client:** React, TailwindCSS, NextUI

**Server:** Node, NestJS, mongoose

## License

[MIT](https://choosealicense.com/licenses/mit/)
