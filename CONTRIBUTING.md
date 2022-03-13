# Setup

This project uses a Lerna Monorepo. Lerna is a tool used to manage multiple
JavaScript packages. There are two self-descriptive packages, the backend
package and the frontend package.

## Prerequisites

### Firebase Setup

This project uses Firebase for authentication. You may want to set up your own
Firebase project for development of this application. Alternatively, you can
share one with other people.

#### New Project

> Follow this if you want to setup a new Firebase project.

##### Frontend (New Project)

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create
   a new project.

2. Go to the top left cog > Project Settings > Scroll down to the "Your apps"
   section and add a new web app.

3. Copy the firebaseConfig code. It should be a single JS object.

4. Paste that object in a new file named `scripts/firebase-config/data.js`,
   replacing the name of the object with `module.exports` and run the script
   next to that file i.e. `node ./packages/frontend/scripts/firebase-config/FirebaseConfigToClipboard.js`.

5. The script will save information to your clipboard. Paste that into the
   REACT_APP_FIREBASE_CONFIG environment variable, replacing all existing
   contents. Please note the .env.development is a COMMITTED file. If you are
   using a different environment, please create and use a new environment file,
   `.env.development.local`.

##### Backend (New Project)

1. Go to service accounts and generate a new private key

2. Name the downloaded file `firebase.json` and place it in the /keys directory.
   DO NOT COMMIT THIS FILE.

#### Sharing or Existing Project

> Follow this if someone else has setup a Firebase project, and you wish to use
> the same one.

##### Frontend (Existing Project)

1. If you can access the console: In Firebase console, go to the top left cog >
   Project Settings > Scroll down to the "Your apps" section. Copy the
   firebaseConfig code. It should be a single JS object.

2. If you cannot access the console: Ask the project owner for the
   firebaseConfig object.

3. Paste that object in a new file named `scripts/firebase-config/data.js`,
   replacing the name of the object with `module.exports` and run the script
   next to that file i.e. `node ./packages/frontend/scripts/firebase-config/FirebaseConfigToClipboard.js`.

4. The script will save information to your clipboard. Paste that into the
   `REACT_APP_FIREBASE_CONFIG` environment variable, replacing all existing
   contents. Please note the `.env.development` is a **COMMITTED** file. If you are
   using a different environment, please create and use a new environment file,
   `.env.development.local`.

##### Backend (Existing Project)

1. Ask the project owner for a private key.

2. Rename this file `firebase.json` and place it in the /keys directory. **`DO NOT COMMIT THIS FILE`**.

### MongoDB

1. Download and install MongoDB: [MongoDB Community
   Edition](https://www.mongodb.com/try/download/community)

2. Ensure that MongoDB is running, either as a process or a background service.

## Starting

1. Download yarn. This can be installed via npm `npm install --global yarn`.

2. At the root level of the project, run `yarn`. This will install the packages
   required for Lerna to work, as well as automatically install packages for the
   frontend and backend packages.

3. Once again at the project root, run `npm run start:dec`. This will
   automatically run the `start:dev` command in all nested packages, which will
   simultaneously run the frontend and backend.
