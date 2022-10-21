import colors from '@src/constants/colors';
import React from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './styles';

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
  return (
    <Icon
      name={showPass ? 'eye' : 'eye-off'}
      size={20}
      color={colors.black}
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

export default AppTextInput;
