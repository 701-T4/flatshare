import React, { useState } from 'react';
import { Text, Input, Spacer, Button } from '@nextui-org/react';
import { auth } from '../../services/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useAuth } from '../../hooks/useAuth';
import {
  MailIcon,
  LockOpenIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import '../../styles/firebaseui-styling.global.css';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAlert } from '../../components/common/util/CornerAlert';
import { FirebaseError } from 'firebase/app';

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { setUser } = useAuth();
  const { createAlert } = useAlert();

  const createSigninErrorAlert = (message: string) => {
    createAlert({
      icon: <ExclamationCircleIcon />,
      message: message,
      mode: 'warning',
    });
  };

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

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const validateUserInputs = async () => {
    console.log([email, password, confirmPassword]);
    if (!email) createSigninErrorAlert('Please enter email');
    else if (!email?.includes('@'))
      createSigninErrorAlert('Please enter a valid email');
    else if (!password) createSigninErrorAlert('Please enter password');
    else if (!isLogin && !confirmPassword)
      createSigninErrorAlert('Please Confirm Password');
    else if (!isLogin && !(password === confirmPassword)) {
      createSigninErrorAlert('Passwords must match');
    } else {
      if (isLogin) await handleEmailSignIn(email!, password!);
      else await handleCreateEmailAccount(email!, password!);
    }
  };

  const handleCreateEmailAccount = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        console.log(error.message);
        createSigninErrorAlert(error.message);
      }
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
                <Text weight="semibold">
                  {isLogin ? 'Login with E-mail' : 'Or sign up with E-mail'}
                </Text>
              </div>
              <div className="flex-grow border-t border-black"></div>
            </div>
            {/* input fields group starts */}
            <Input
              onChange={(v) => setEmail(v.target.value)}
              contentLeft={<MailIcon style={{ height: '100%' }} />}
              placeholder="Your email"
            />
            <Spacer y={0.5} />
            <Input.Password
              onChange={(v) => setPassword(v.target.value)}
              contentLeft={<LockOpenIcon style={{ height: '100%' }} />}
              placeholder="Your password"
            />
            <Spacer y={0.5} />
            {/* Show forgot password on login, and show another password input field on sign up */}
            {isLogin ? (
              <div>
                <div className="flex justify-end">
                  <Button size="xs" light>
                    <Text size={12}>Forgot You Password?</Text>
                  </Button>
                </div>
                <Spacer y={0.75} />
              </div>
            ) : (
              <Input.Password
                onChange={(v) => setConfirmPassword(v.target.value)}
                contentLeft={<LockOpenIcon style={{ height: '100%' }} />}
                placeholder="Confirm password"
              />
            )}
            {/* Button for sigup/login */}
            <Button
              className="my-5"
              style={{
                backgroundColor: '#2596A4',
              }}
              onClick={() => validateUserInputs()}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <div className="flex justify-center">
              {/* Button for switch login/signup */}
              <Button size="xs" light onClick={() => setIsLogin(!isLogin)}>
                <Text size={12}>
                  {isLogin
                    ? "Don't have an account? Click here to sign up"
                    : 'Already have an account?'}
                </Text>
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
