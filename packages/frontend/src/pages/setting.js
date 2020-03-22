import React from 'react';
import { Text, Alert } from 'react-native';
import { List, ListItem } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { setItemAsync } from 'expo-secure-store';
import MainFooter from '../components/footer';
import api from '../utils/api';

const Setting = () => {
  const nav = useNavigation();

  const revoke = () => {
    Alert.alert('Revoke all token', 'Are you sure?', [
      {
        text: 'Cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          api({
            path: 'api/auth/revoke'
          });
        }
      }
    ]);
  };

  const signOut = () => {
    Alert.alert('Sign out', 'Are you sure?', [
      {
        text: 'Cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          api({
            path: 'api/auth/logout'
          });
          setTimeout(() => {
            setItemAsync('app_token', '').then(() => nav.navigate('SignIn'));
          }, 1000);
        }
      }
    ]);
  };

  return (
    <MainFooter now="Setting">
      <List>
        <ListItem onPress={revoke}>
          <Text>Revoke all token of my account</Text>
        </ListItem>
        <ListItem onPress={signOut}>
          <Text>Sign out</Text>
        </ListItem>
      </List>
    </MainFooter>
  );
};

export default Setting;
