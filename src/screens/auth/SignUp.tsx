import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

import AppButton from '../../components/Button';
import AppTextInput from '../../components/Input';
import colors from '../../constants/colors';
import globalStyles from '../../constants/globalStyles';
import useFirestore from '../../hooks/useFirestore';

type NavigationProps = NativeStackNavigationProp<any>;

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const {addUserToDB} = useFirestore();

  const iconPressHandler = () => {
    setShowPass(!showPass);
  };
  const {handleSubmit, control, setError} = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<NavigationProps>();

  const submitHandler = (data: any) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.pass)
      .then(userRef => {
        // Add user to DB
        addUserToDB({
          userID: userRef.user.uid,
          name: data.name,
          email: data.email,
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

export default SignUp;
