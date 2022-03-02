# Setup

This project uses a Lerna Monorepo. Lerna is a tool used to manage multiple JavaScript packages. There are two self-descriptive packages, the backend package and the frontend package.

# To Setup

1. At the root level of the project, run `yarn`. This will install the packages required for Lerna to work, as well as automatically install packages for the frontend and backend packages.

2. Once again at the project root, run `npm run start`. This will automatically run the `start` command in all nested packages, which will simultaneously run the frontend and backend.
