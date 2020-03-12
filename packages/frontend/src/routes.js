import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Settings from './pages/settings';
import SignIn from './pages/sign-in';

const Stack = createStackNavigator();

const NO_HEADER = {
  headerShown: false
};

const Routes = ({ alreadySignIn }) => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={alreadySignIn ? 'Home' : 'SignIn'}
    >
      <Stack.Screen name="Home" component={Home} options={NO_HEADER} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

Routes.propTypes = {
  alreadySignIn: PropTypes.bool.isRequired
};

export default Routes;
