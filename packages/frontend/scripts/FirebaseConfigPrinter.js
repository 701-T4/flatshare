(async () => {
  const clipboardy = await import('clipboardy');

  // REPLACE THIS WITH YOUR FIREBASE CONFIG.
  const firebaseConfig = {
    apiKey: 'AIzaSyCWgxNPREB1Pw7JXaOjq5c63TdhK0HKHcg',
    authDomain: 'flat-split.firebaseapp.com',
    projectId: 'flat-split',
    storageBucket: 'flat-split.appspot.com',
    messagingSenderId: '404672973040',
    appId: '1:404672973040:web:496005cc4f28f56ab75a35',
    measurementId: 'G-D05DK4ZWJ2',
  };

  clipboardy.default.writeSync("'" + JSON.stringify(firebaseConfig) + "'");
  console.log(
    '🚀 Copied firebase config to clipboard. Paste it inside your .env file as REACT_APP_FIREBASE_CONFIG.',
  );
})();
