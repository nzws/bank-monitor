import { AsyncStorage } from 'react-native';
import { getItemAsync, setItemAsync } from 'expo-secure-store';

const api = async ({ path, method = 'GET', data = {} }) => {
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
  if (token && json.error === 'require_auth') {
    await setItemAsync('app_token', null);
  }

  return json;
};

export default api;
