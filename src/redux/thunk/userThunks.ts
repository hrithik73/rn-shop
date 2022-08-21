import auth from '@react-native-firebase/auth';
import { FieldError } from 'react-hook-form';
import useFirestore from '../../hooks/useFirestore';
import { USER_LOGGED_IN } from '../constants';

type LogInProps = {
  email: string;
  pass: string;
  setError: (name: string, error: FieldError) => void;
};

type SignUpProps = {
  email: string;
  pass: string;
  name: string;
  setError: (name: string, error: FieldError) => void;
};

// Thunk for Login the user
export const logInUser =
  ({ email, pass, setError }: LogInProps) =>
  async (dispatch: any) => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async ({ user }) => {
        console.log('User Logged-In Successfully');
        dispatch({ type: USER_LOGGED_IN, payload: user.uid });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setError('email', {
            type: 'custom',
            message: 'Email Address is not Valid',
          });
        }
        if (error.code === 'auth/wrong-password') {
          setError('pass', {
            type: 'custom',
            message: 'Wrong Password',
          });
        }
      });
  };

export const signUpuser =
  ({ email, pass, name, setError }: SignUpProps) =>
  async (dispatch: any) => {
    const { addUserToDB } = useFirestore();

    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(userRef => {
        // Add user to DB
        addUserToDB({
          userID: userRef.user.uid,
          name: name,
          email: email,
        });
        // Set User in Redux
        dispatch({ type: USER_LOGGED_IN, payload: userRef.user.uid });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('email', {
            type: 'custom',
            message: 'That email address is already in use!',
          });
        }
        if (error.code === 'auth/invalid-email') {
          setError('email', {
            type: 'custom',
            message: 'The Email is invalid',
          });
        }
        console.error(error);
      });
  };
