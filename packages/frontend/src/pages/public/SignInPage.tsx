import React, { useState } from 'react';
import { Button, Checkbox, Input, Row, Text } from '@nextui-org/react';
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
        setUser(auth.currentUser);
        return false;
      },
    },
  };

  return (
    <div className="h-screen flex justify-center items-center  bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-col items-center ">
        <Text h1 size={48} color="white" weight="bold">
          Log in
        </Text>
        <div className="px-20 py-20 flex flex-col w-full">
          <StyledFirebaseAuth
            className="w-full"
            uiConfig={uiConfig}
            firebaseAuth={auth}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
