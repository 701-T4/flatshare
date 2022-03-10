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
        const R = require('ramda');
        const userParam = R.pickAll(['displayName', 'email'], auth.currentUser);
        setUser(userParam);
        return false;
      },
    },
  };

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  return (
    <div className="h-screen overflow-y-auto flex justify-center items-center  bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex flex-col items-center bg-white rounded">
        <Text h1 size={50}>
          Log in
        </Text>
        <div className="px-20 flex flex-col w-full">
          <Input
            clearable
            bordered
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="my-4"
            color="primary"
            placeholder="Email"
          />
          <Input.Password
            className="my-4"
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
          />
          <Button size="lg" className="item-center">
            Login
          </Button>
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
