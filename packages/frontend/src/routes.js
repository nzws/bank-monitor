import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Settings from './pages/settings';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default Routes;
