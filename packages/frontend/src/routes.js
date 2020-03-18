import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import SignIn from './pages/sign-in';
import Setting from './pages/setting';
import Notification from './pages/notification';
import Transaction from './pages/transaction';
import Container from './components/container';
import updateStatus from './utils/status';
import DepositRakuten from './pages/deposit_rakuten';

const Stack = createStackNavigator();

const Routes = ({ alreadySignIn }) => {
  let {
    status: [, setStatus]
  } = Container.useContainer();
  setInterval(() => updateStatus(setStatus), 1000 * 60 * 5);

  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName={alreadySignIn ? 'Home' : 'SignIn'}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          animationEnabled: false
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          animationEnabled: false
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          animationEnabled: false
        }}
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="DepossitToRakuten" component={DepositRakuten} />
    </Stack.Navigator>
  );
};

Routes.propTypes = {
  alreadySignIn: PropTypes.bool.isRequired
};

export default Routes;
