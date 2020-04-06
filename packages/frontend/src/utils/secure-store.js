import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const isNative = Platform.OS !== 'web';

export const setItemAsync = async (key, value) => {
  if (isNative) {
    return SecureStore.setItemAsync(key, value);
  } else {
    return window.localStorage.setItem(`ss_${key}`, value);
  }
};

export const getItemAsync = async key => {
  if (isNative) {
    return SecureStore.getItemAsync(key);
  } else {
    return window.localStorage.getItem(`ss_${key}`);
  }
};
