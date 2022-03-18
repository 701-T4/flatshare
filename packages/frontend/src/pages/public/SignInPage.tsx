import React, { useState } from 'react';
import { Text, Input, Spacer, Button } from '@nextui-org/react';
import { auth } from '../../services/firebase';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useAuth } from '../../hooks/useAuth';
import {
  MailIcon,
  LockOpenIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/outline';
import '../../styles/firebaseui-styling.global.css';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useAlert } from '../../components/common/util/CornerAlert';
import { FirebaseError } from 'firebase/app';

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const { setUser } = useAuth();
  const { createAlert } = useAlert();

  const createSigninErrorAlert = (message: string) => {
    createAlert(
      {
        icon: <ExclamationCircleIcon />,
        message: message,
        mode: 'warning',
      },
      2000,
    );
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
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const validateUserInputs = () => {
    console.log([email, password, confirmPassword]);
    if (!email) {
      createSigninErrorAlert('Please enter email');
      return false;
    } else if (!email?.includes('@')) {
      createSigninErrorAlert('Please enter a valid email');
      return false;
    } else if (!password) {
      createSigninErrorAlert('Please enter password');
      return false;
    }
    return true;
  };

  const validateLoginInput = async () => {
    if (validateUserInputs()) {
      await handleEmailSignIn(email!, password!);
    }
  };

  const validateSignUpInput = async () => {
    if (!validateUserInputs()) {
      return;
    }
    if (password !== confirmPassword) {
      return createSigninErrorAlert('Passwords must match');
    }
    await handleCreateEmailAccount(email!, password!);
  };

  const handleCreateEmailAccount = async (email: string, password: string) => {
    try {
      const user = (await createUserWithEmailAndPassword(auth, email, password))
        .user;
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          createSigninErrorAlert('Emails already in use');
        } else if (error.code === 'auth/invalid-email') {
          createSigninErrorAlert('Please enter a true email address');
        } else if (error.code === 'auth/weak-password') {
          createSigninErrorAlert('Please enter a stronger password');
        } else {
          createSigninErrorAlert(error.message);
        }
      }
    }
  };

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-email') {
          createSigninErrorAlert('Please enter a valid email');
        } else if (error.code === 'auth/user-not-found') {
          createSigninErrorAlert('No such user');
        } else if (error.code === 'auth/wrong-password') {
          createSigninErrorAlert('Wrong Password');
        } else {
          createSigninErrorAlert(error.message);
        }
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gradient-to-b from-land_page_bg_start to-land_page_bg_end">
      <div className="flex justify-center w-full item-center">
        <div className="flex flex-col items-center bg-white rounded-xl drop-shadow-xl">
          <Text h1 size={32} className="py-10 text-gray-900" weight="bold">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
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
            {isLogin ? (
              <></>
            ) : (
              <>
                <Input
                  aria-label="Name"
                  onChange={(v) => setName(v.target.value)}
                  contentLeft={<UserIcon style={{ height: '100%' }} />}
                  placeholder="Name"
                />
                <Spacer y={0.5} />
              </>
            )}
            <Input
              aria-label="Email"
              onChange={(v) => setEmail(v.target.value)}
              contentLeft={<MailIcon style={{ height: '100%' }} />}
              placeholder="Your email"
            />
            <Spacer y={0.5} />
            <Input.Password
              aria-label="Password"
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
                    <Text size={12}>Forgot Your Password?</Text>
                  </Button>
                </div>
                <Spacer y={0.75} />
              </div>
            ) : (
              <Input.Password
                aria-label="Confirm password"
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
              onClick={() =>
                isLogin ? validateLoginInput() : validateSignUpInput()
              }
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <div className="flex justify-center">
              {/* Button for switch login/signup */}
              <Button size="xs" light onClick={() => setIsLogin(!isLogin)}>
                <Text size={12}>
                  {isLogin ? (
                    <>
                      {"Don't have an account? "}
                      <span className="text-teal-500">
                        {'Click here to sign up'}
                      </span>
                    </>
                  ) : (
                    'Already have an account?'
                  )}
                </Text>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
