import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator'; // Define this later

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
