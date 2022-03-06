(async () => {
  const clipboardy = await import('clipboardy');
  const firebaseConfig = require('./data');

  clipboardy.default.writeSync("'" + JSON.stringify(firebaseConfig) + "'");
  console.log(
    '🚀 Copied firebase config to clipboard. Paste it inside your .env file as REACT_APP_FIREBASE_CONFIG.',
  );
})();
