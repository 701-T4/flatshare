import React from 'react';
import { Text, Input, Spacer, Button } from '@nextui-org/react';
import { auth } from '../../services/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useAuth } from '../../hooks/useAuth';
import { MailIcon, LockOpenIcon } from '@heroicons/react/outline';
import '../../styles/firebaseui-styling.global.css';
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
    <div className="flex flex-row items-center justify-center h-screen bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex justify-center w-full lg:w-1/2 item-center">
        <div className="flex flex-col items-center bg-white rounded-xl drop-shadow-xl">
          <Text h1 size={48} className="pt-10" color="black" weight="bold">
            Log in
          </Text>
          {/* container for all user login input*/}
          <div className="flex flex-col pb-10 px-14">
            <StyledFirebaseAuth
              className="w-full"
              uiConfig={uiConfig}
              firebaseAuth={auth}
            />
            {/* the text with line before and after */}
            <div className="flex items-center py-5 ">
              <div className="flex-grow border-t border-black"></div>
              <div className="px-2 pb-1">
                <Text weight="semibold">Or sign up with e-mail</Text>
              </div>
              <div className="flex-grow border-t border-black"></div>
            </div>
            {/* input fields group starts */}
            <Input
              contentLeft={<MailIcon style={{ height: '100%' }} />}
              placeholder="Your email"
            />
            <Spacer y={0.5} />
            <Input
              contentLeft={<LockOpenIcon style={{ height: '100%' }} />}
              placeholder="Your password"
            />
            <Spacer y={0.5} />
            <Input
              contentLeft={<LockOpenIcon style={{ height: '100%' }} />}
              placeholder="Confirm password"
            />
            <Button
              className="my-5"
              style={{
                backgroundColor: '#2596A4',
              }}
            >
              Sign Up
            </Button>
            <div className="flex justify-center">
              <Button size="xs" light>
                <Text size={12}>Already have an account?</Text>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* right side image on large screen only*/}
      <div className="hidden w-1/3 -mt-12 bg-center bg-no-repeat bg-contain lg:flex lg:h-96 bg-house" />
    </div>
  );
};

export default SignInPage;
