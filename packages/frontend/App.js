import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import Routes from './src/routes';

const theme = {
  primary: '#34B362',
  secondary: '#4d4d4d',
  info: '#1D5799',
  cyan: '#4088C7',
  warning: '#FABC55',
  danger: '#F96654'
};

const SafeArea = ({ children }) => {
  if (Platform.os === 'ios') {
    return <SafeAreaView>{children}</SafeAreaView>;
  }

  return children;
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      ...Ionicons.font
    }).then(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <SafeArea>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </SafeArea>
  );
};

export default App;
