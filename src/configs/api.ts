import axios from 'axios';
import { Platform } from 'react-native';
// export const baseURL = 'https://api.escuelajs.co/api/v1';

export const DEV_BASE_URL_ANDROID = '';
export const DEV_BASE_URL = 'http://localhost:3000';

export const PROD_BASE_URL = '';

export const getBaseURL = () => {
  if (__DEV__) {
    // Todo:- Set url according to OS
    return Platform.OS === 'android'
      ? 'http://192.168.42.185:3000'
      : DEV_BASE_URL;
  }
  return PROD_BASE_URL;
};

export const api = axios.create({
  baseURL: getBaseURL(),
});
