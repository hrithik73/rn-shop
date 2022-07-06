import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import AppButton from '../../components/Button';
import AppTextInput from '../../components/Input';
import colors from '../../constants/colors';

type NavigationProps = NativeStackNavigationProp<any>;

const SignUp = () => {
  const {handleSubmit, control} = useForm({
    mode: 'onBlur',
  });

  const navigator = useNavigation<NavigationProps>();

  const submitHandler = (data: any) => {
    console.log(data);
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
        name="password"
        placeholder="Password"
        rules={{
          required: true,
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
            message: 'Please Enter a strong password',
          },
        }}
        secureTextEntry={true}
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
