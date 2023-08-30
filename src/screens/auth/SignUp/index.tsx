import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, Text } from 'react-native';

import AppButton from '@src/components/Button/Button';
import AppTextInput from '@src/components/Input/Input';
import globalStyles from '@src/constants/globalStyles';
import { useAppDispatch } from '@src/redux/store';
import { signUpuser } from '@src/redux/thunk/userThunks';
import styles from './styles';

type HomeStackNavigationProps = NativeStackNavigationProp<any>;

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();

  const iconPressHandler = () => {
    setShowPass(!showPass);
  };
  const { handleSubmit, control, setError } = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<HomeStackNavigationProps>();

  const submitHandler = (data: any) => {
    dispatch(
      signUpuser({
        name: data.name,
        email: data.email,
        pass: data.pass,
        setError: setError,
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={globalStyles.authHeading}>RN SHOP</Text>
      <AppTextInput
        control={control}
        name="name"
        placeholder="Name"
        rules={{
          required: {
            value: true,
            message: 'Name is required',
          },
        }}
      />
      <AppTextInput
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
        rules={{
          required: {
            value: true,
            message: 'Email can not be empty',
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
            message: 'Pass can not be empty',
          },
          minLength: {
            value: 8,
            message: 'Mini length for password is 8',
          },
        }}
        onIconPress={iconPressHandler}
        showPass={showPass}
        isPass={true}
      />
      <AppButton
        customStyle={styles.signUpInbtn}
        text="SignUp"
        onPress={handleSubmit(submitHandler)}
      />
      <Text style={styles.orTxt}>OR</Text>
      <AppButton
        customStyle={styles.logInbtn}
        text="Login"
        onPress={() => navigator.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export default SignUp;
