import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import AppButton from '../../components/Button';
import AppTextInput from '../../components/Input';
import colors from '../../constants/colors';
import globalStyles from '../../constants/globalStyles';
import { USER_LOGGED_IN } from '../../redux/constants';
import { useAppDispatch } from '../../redux/store';
import { AuthStackNavigatorProps } from '../../types/NavigationTypes';

const Login = () => {
  //Todo:- Writing a better logic for this
  const [showPass, setShowPass] = useState(false);

  const dispatch = useAppDispatch();

  const iconPressHandler = () => {
    setShowPass(!showPass);
  };

  const { handleSubmit, control, setError } = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<AuthStackNavigatorProps>();

  const submitHandler = (data: any) => {
    // console.log(data);
    auth()
      .signInWithEmailAndPassword(data.email, data.pass)
      .then(async ({ user }) => {
        console.log('User Logged-In Successfully');

        await Promise.all([
          crashlytics().setUserId(user.uid),
          crashlytics().setAttribute('credits', String(user.metadata)),
          crashlytics().setAttributes({
            role: 'admin',
            followers: '13',
            email: user.email,
            username: user.displayName,
          }),
        ]);
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={globalStyles.authHeading}>RN SHOP</Text>
      <AppTextInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },

          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'invalid email address',
          },
        }}
      />
      <AppTextInput
        control={control}
        name="pass"
        placeholder="Password"
        rules={{
          required: {
            value: true,
            message: 'This field is required',
          },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //   message: 'Please Enter a strong password',
          // },
          minLength: {
            value: 8,
            message: 'Minimum 8 char is required',
          },
        }}
        onIconPress={iconPressHandler}
        showPass={showPass}
        isPass={true}
      />
      <AppButton
        customStyle={styles.logInbtn}
        text="Login"
        onPress={handleSubmit(submitHandler)}
      />
      <Text style={styles.orTxt}>OR</Text>
      <AppButton
        customStyle={styles.signUpInbtn}
        text="SignUp"
        onPress={() => navigator.navigate('SignUp')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    marginTop: 150,
  },
  logInbtn: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  signUpInbtn: {
    backgroundColor: colors.grey,
    marginTop: 20,
    marginHorizontal: 30,
  },
  orTxt: {
    paddingTop: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default Login;
