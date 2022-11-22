import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text } from 'react-native';

import AppButton from '@src/components/Button/Button';
import AppTextInput from '@src/components/Input/Input';
import globalStyles from '@src/constants/globalStyles';
import { useAppDispatch } from '@src/redux/store';
import { logInUser } from '@src/redux/thunk/userThunks';
import { AuthStackNavigatorProps } from '@src/types/NavigationTypes';
import styles from './style';

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
    dispatch(logInUser({ email: data.email, pass: data.pass, setError }));
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
            message: 'Email is required',
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
            message: 'Password is required',
          },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //   message: 'Please Enter a strong password',
          // },
          minLength: {
            value: 8,
            message: 'Password must be atleast 8 charaters',
          },
        }}
        onIconPress={iconPressHandler}
        showPass={showPass}
        isPass={true}
      />
      <AppButton text="Login" onPress={handleSubmit(submitHandler)} />
      <Text style={styles.orTxt}>OR</Text>
      <AppButton
        customStyle={styles.signUpInbtn}
        text="SignUp"
        onPress={() => navigator.navigate('SignUp')}
      />
    </SafeAreaView>
  );
};

export default Login;
