import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import colors from '../constants/colors';

type AppTextInputProps = {
  control: any;
  name: string;
  customStyles?: any;
  showPass?: boolean;
  onIconPress?: any;
} & TextInputProps &
  FieldValues;

type EyeIconType = {
  showPass?: boolean;
  onIconPress: any;
};

const EyeIcon = ({ showPass, onIconPress }: EyeIconType) => {
  return showPass ? (
    <Icon
      name="eye"
      size={20}
      onPress={() => onIconPress()}
      style={styles.iconStyle}
    />
  ) : (
    <Icon
      name="eye-off"
      size={20}
      onPress={onIconPress}
      style={styles.iconStyle}
    />
  );
};

const AppTextInput = ({
  control,
  name,
  customStyles,
  showPass,
  isPass = false,
  onIconPress,
  ...rest
}: AppTextInputProps) => {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.inputContainer, customStyles]}>
          <TextInput
            autoCapitalize="none"
            onChangeText={val => onChange(val)}
            placeholderTextColor={colors.grey}
            onBlur={onBlur}
            style={styles.input}
            secureTextEntry={!showPass && isPass}
            value={value}
            {...rest}
          />
          {isPass && <EyeIcon showPass={showPass} onIconPress={onIconPress} />}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
      control={control}
      name={name}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    height: 50,
    borderColor: colors.grey,
    paddingLeft: 10,
  },
  errorText: {
    paddingLeft: 5,
    paddingTop: 5,
    color: 'red',
  },
  iconStyle: {
    position: 'absolute',
    right: 13,
    top: 13,
  },
});

export default AppTextInput;
