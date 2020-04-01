import { AsyncStorage, Alert } from 'react-native';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

const api = async ({ path, method = 'POST', data = {} }) => {
  const domain = await AsyncStorage.getItem('domain');
  const token = await getItemAsync('app_token');

  const res = await fetch(`${domain}/${path}`, {
    method,
    body: method === 'POST' ? JSON.stringify(data) : null,
    headers: {
      Authorization: token || null,
      'Content-Type': 'application/json'
    }
  });
  const json = await res.json();
  if (
    token &&
    (json.error === 'require_auth' || json.error === 'invalid_token')
  ) {
    await setItemAsync('app_token', '');
    Alert.alert(
      'Recertification required',
      'Restart the app and sign in again.'
    );
    throw new Error(json.error);
  }
  if (json.error) {
    Alert.alert(`API Error: ${json.code}`, json.error);
    throw new Error(json.error);
  }

  return json;
};

export default api;
