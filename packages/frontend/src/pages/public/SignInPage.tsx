import React from 'react';
import { Text } from '@nextui-org/react';
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
    <div className="h-screen flex flex-row justify-center items-center  bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex w-full lg:w-1/2 item-center justify-center">
        <div className="flex flex-col items-center border-4 rounded-xl drop-shadow-xl">
          <Text h1 size={48} className="pt-10" color="white" weight="bold">
            Log in
          </Text>
          {/* container for all user login input*/}
          <div className="px-10 pt-20 pb-10 flex flex-col">
            <StyledFirebaseAuth
              className="w-full"
              uiConfig={uiConfig}
              firebaseAuth={auth}
            />
          </div>
        </div>
      </div>
      {/* right side image on large screen only*/}
      <div className="w-1/3 -mt-12 bg-center bg-no-repeat bg-contain hidden lg:flex lg:h-96 bg-house" />
    </div>
  );
};

export default SignInPage;
