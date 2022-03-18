1. Create a file named `data.js` in the same directory as this readme.

2. Copy the Firebase web app config from the Firebase Console. Read the root `CONTRIBUTING.md` file for more information.

3. Paste that config object into the `data.js` file.

4. Replace `firebaseConfig` with `module.exports` and run the script next to the file. It should look like:

```js
module.exports = {
  apiKey: '...',
  authDomain: '...',
  ...etc,
};
```

5. Paste the result into the `REACT_APP_FIREBASE_CONFIG` environment variable.
