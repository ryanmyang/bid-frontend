import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingNavigator from './OnboardingNavigator';
import MainTabNavigator from './MainTabNavigator';
import { getOnboarded } from '@/storage/onboardingStorage';

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [checkingStorage, setCheckingStorage] = useState(true);

  // In a real app, you'd check some persisted auth state / tokens, etc.
  useEffect(() => {
    // For demo: simulate an async check
    const checkAuthAndOnboarding = async () => {
      // e.g., check if user is logged in + completed onboarding 
      setIsOnboarded(false);

      const hasOnboarded = await getOnboarded(); // <- from your new storage file
      setIsOnboarded(hasOnboarded);
      setCheckingStorage(false);

    };
    checkAuthAndOnboarding();



  }, []);

  // While reading AsyncStorage, show a loading placeholder
  if (checkingStorage) {
    return null; // or a loading spinner, etc.
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

        {!isOnboarded ?  <Stack.Screen name="Onboarding" component={OnboardingNavigator} />: <></>}

        <Stack.Screen name="MainTabs" component={MainTabNavigator} />

    </Stack.Navigator>
  );
}
