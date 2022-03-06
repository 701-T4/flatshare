# Setup

This project uses a Lerna Monorepo. Lerna is a tool used to manage multiple JavaScript packages. There are two self-descriptive packages, the backend package and the frontend package.

# To Setup

0. Download yarn. This can be installed via npm `npm install --global yarn`.

1. At the root level of the project, run `yarn`. This will install the packages required for Lerna to work, as well as automatically install packages for the frontend and backend packages.

2. Once again at the project root, run `npm run start`. This will automatically run the `start` command in all nested packages, which will simultaneously run the frontend and backend.

# Firebase Setup

This project uses Firebase for authentication. You may want to set up your own Firebase project for development of this application.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. Go to the top left cog > Project Settings > Scroll down to the "Your apps" section and add a new web app.

3. Copy the firebaseConfig code. It should be a single JS object.

4. Paste that object in the indicated location in `scripts/FirebaseConfigPrinter.js` and run the script.

5. The script will save information to your clipboard. Paste that into the REACT_APP_FIREBASE_CONFIG environment variable, replacing all existing contents.
