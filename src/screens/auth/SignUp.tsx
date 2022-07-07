import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

import AppButton from '../../components/Button';
import AppTextInput from '../../components/Input';
import colors from '../../constants/colors';

type NavigationProps = NativeStackNavigationProp<any>;

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);

  const iconPressHandler = () => {
    setShowPass(!showPass);
  };
  const {handleSubmit, control, setError} = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<NavigationProps>();

  const submitHandler = (data: any) => {
    // console.log(data);
    auth()
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then(() => {
        console.log('User account created & signed in!');
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
  return (
    <SafeAreaView style={styles.container}>
      <AppTextInput
        control={control}
        name="name"
        placeholder="Name"
        rules={{
          required: {
            value: true,
            message: 'This field is required',
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
            message: 'This Field is Required',
          },
          minLength: {
            value: 8,
            message: 'Mini length for password is 8',
          },
          // pattern: {
          //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
          //   message: 'Please Enter a strong password',
          // },
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
    marginTop: 100,
  },
  logInbtn: {
    marginTop: 20,
  },
  signUpInbtn: {
    backgroundColor: colors.grey,
    marginTop: 20,
  },
  orTxt: {
    paddingTop: 15,
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default SignUp;
