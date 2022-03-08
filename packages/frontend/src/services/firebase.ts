import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG ?? '{}',
);

const app = initializeApp(firebaseConfig);

//Use auth from other components to access the up-to-date user information
//i.e. auth.currentUser
export const auth = getAuth(app);
