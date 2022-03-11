import React from 'react';
import { auth } from '../../services/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useAuth } from '../../hooks/useAuth';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { setUser } = useAuth();

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setUser(auth.currentUser);
        return false;
      },
    },
  };

  const handleCreateEmailAccount = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p>Signin</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default SignInPage;
