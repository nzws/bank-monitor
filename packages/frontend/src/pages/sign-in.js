import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { setItemAsync } from 'expo-secure-store';
import * as GoogleSignIn from 'expo-google-sign-in';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Center, Title } from '../components/styles/layout';
import api from '../utils/api';

const StyledContainer = styled(Center)({
  paddingTop: 150
});

const Input = styled(TextInput)({
  marginTop: 10,
  height: 40,
  borderBottomColor: ({ theme: { secondary } }) => secondary,
  borderBottomWidth: 0.5,
  width: '80%'
});

const BtnBlock = styled(View)({
  marginTop: 20,
  width: '50%'
});

const isExpo = Constants.appOwnership === 'expo';

const SignIn = () => {
  const navigation = useNavigation();
  const [domain, setDomain] = useState('');
  const [password, setPassword] = useState('');
  const [UID, setUID] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isExpo) {
      GoogleSignIn.initAsync({
        clientId: '',
        scopes: [GoogleSignIn.SCOPES.PROFILE, GoogleSignIn.SCOPES.EMAIL]
      })
        .then(() => setIsReady(true))
        .catch(e => Alert.alert('Error', e.message));
    } else {
      setIsReady(true);
    }
  }, []);

  const login = UID => {
    AsyncStorage.setItem('domain', domain)
      .then(() => Permissions.askAsync(Permissions.NOTIFICATIONS))
      .then(({ status }) =>
        status === 'granted' ? Notifications.getExpoPushTokenAsync() : null
      )
      .then(token =>
        api({
          path: 'login',
          method: 'POST',
          data: {
            UID,
            password,
            deviceToken: isExpo ? null : token
          }
        })
      )
      .then(({ token, error }) => {
        if (!token) {
          throw new Error(error);
        }

        return setItemAsync('app_token', token);
      })
      .then(() => navigation.navigate('Home'))
      .catch(e => {
        Alert.alert('Error', e.message || 'Unknown error');
      });
  };

  const onPress = () => {
    if (!password || !domain) {
      return Alert.alert('Error', 'Please enter all of the items.');
    }
    if (isExpo) {
      // debug
      return login(UID);
    }

    GoogleSignIn.askForPlayServicesAsync()
      .then(() => GoogleSignIn.signInAsync())
      .then(({ type, user }) => {
        if (type === 'success' && user) {
          login(user.uid);
          return null;
        } else {
          Alert.alert('Error', 'Your account login was declined.');
          return null;
        }
      })
      .then(() => GoogleSignIn.signOutAsync())
      .catch(e => Alert.alert('Error', e.message));
  };

  return (
    <StyledContainer>
      <Title fontSize={40}>Bank Monitor</Title>
      <Title fontSize={18}>A open source online-banking app</Title>

      <Input
        onChangeText={setDomain}
        value={domain}
        placeholder="Server Domain (ex: https://example.com/)"
        autoCompleteType="off"
        textContentType="URL"
      />

      {isExpo && (
        <Input
          onChangeText={setUID}
          value={UID}
          placeholder="UID (for Debug)"
          autoCompleteType="off"
        />
      )}

      <Input
        onChangeText={setPassword}
        value={password}
        placeholder="Encryption password"
        autoCompleteType="password"
        textContentType="password"
        keyboardType="visible-password"
        secureTextEntry
      />

      <BtnBlock>
        <Button
          title={
            isReady
              ? isExpo
                ? 'Local Sign in'
                : 'Sign in with Google'
              : 'Loading...'
          }
          onPress={onPress}
          disabled={!isReady}
        />
      </BtnBlock>
    </StyledContainer>
  );
};

export default SignIn;
