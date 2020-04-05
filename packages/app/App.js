import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar, Platform, UIManager } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { getItemAsync } from 'expo-secure-store';

import Routes from './src/routes';
import Container from './src/components/container';
import colors from './src/components/styles/colors';

console.disableYellowBox = true;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [alreadySignIn, setAlreadySignIn] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    })
      .then(() => getItemAsync('app_token'))
      .then(token => setAlreadySignIn(!!token))
      .then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Container.Provider>
      <ThemeProvider theme={colors}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
        />
        <NavigationContainer>
          <Routes alreadySignIn={alreadySignIn} />
        </NavigationContainer>
      </ThemeProvider>
    </Container.Provider>
  );
};

export default App;
