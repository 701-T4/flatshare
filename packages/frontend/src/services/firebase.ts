import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = JSON.parse(
  process.env.REACT_APP_FIREBASE_CONFIG ?? '{}',
);

const app = initializeApp(firebaseConfig);

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_USE_AUTH_EMULATOR_IF_DEV === 'true'
) {
  connectAuthEmulator(getAuth(), 'http://localhost:9099');
}

//Use auth from other components to access the up-to-date user information
//i.e. auth.currentUser
export const auth = getAuth(app);
