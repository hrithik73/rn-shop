import auth from '@react-native-firebase/auth';
import { FieldError } from 'react-hook-form';

import useFirestore from '@src/hooks/useFirestore';
import { REMOVE_FROM_CART, USER_LOGGED_IN } from '../constants';
import { getCategories } from './productsThunk';
import { TypedDispatch } from '@src/redux/store';

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
    console.log('Inside thunk');
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async ({ user }) => {
        console.log('User Logged-In Successfully');
        dispatch({
          type: USER_LOGGED_IN,
          payload: {
            email: user.email,
            useId: user.uid,
            name: user.displayName,
          },
        });
      })
      .catch(error => {
        // Todo:- Add case for user doesn't exits
        // console.log('Geerting error', error.code);
        console.log('error====>', error);
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
        setError('email', {
          type: 'custom',
          message: 'Error While Login',
        });
      });
    dispatch(getCategories);
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
        dispatch({
          type: USER_LOGGED_IN,
          payload: {
            email: email,
            userId: userRef.user.uid,
            name: userRef.user.displayName,
          },
        });
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
    dispatch(getCategories);
  };

type RemoveFromCartProps = {
  productID: string;
  userID: string;
};

export const removeFromCart =
  ({ productID, userID }: RemoveFromCartProps) =>
  async (dispatch: TypedDispatch) => {
    const { removeFromCartFireStore } = useFirestore();
    removeFromCartFireStore({ productID: productID, userID: userID });
    dispatch({ type: REMOVE_FROM_CART, payload: productID });
  };
