import React from 'react';
import { auth } from '../../services/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import { useAuth } from '../../hooks/useAuth';

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { setSignedIn, setUser } = useAuth();

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setSignedIn(true);
        const R = require('ramda');
        const userParam = R.pickAll(['displayName', 'email'], auth.currentUser);
        setUser(userParam);
        return false;
      },
    },
  };

  return (
    <div>
      <p>Signin</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default SignInPage;
