# Setup

This project uses a Lerna Monorepo. Lerna is a tool used to manage multiple JavaScript packages. There are two self-descriptive packages, the backend package and the frontend package.

# To Setup

0. Download yarn. This can be installed via npm `npm install --global yarn`.

1. At the root level of the project, run `yarn`. This will install the packages required for Lerna to work, as well as automatically install packages for the frontend and backend packages.

2. Once again at the project root, run `npm run start`. This will automatically run the `start` command in all nested packages, which will simultaneously run the frontend and backend.

# Firebase Setup

This project uses Firebase for authentication. You may want to set up your own Firebase project for development of this application.

## Frontend

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. Go to the top left cog > Project Settings > Scroll down to the "Your apps" section and add a new web app.

3. Copy the firebaseConfig code. It should be a single JS object.

4. Paste that object in a new file named `scripts/firebase-config/data.js`, replacing the name of the object with `module.exports` and run the script next to that file.

5. The script will save information to your clipboard. Paste that into the REACT_APP_FIREBASE_CONFIG environment variable, replacing all existing contents.

## Backend

### If You Created a New Project in the Previous Step

1. Go to service accounts and generate a new private key

2. Name the downloaded file `firebase.json` and place it in the /keys directory. DO NOT COMMIT THIS FILE.

### Using an Existing Project

1. Ask the project owner for a private key.

2. Rename this file `firebase.json` and place it in the /keys directory. DO NOT COMMIT THIS FILE.
