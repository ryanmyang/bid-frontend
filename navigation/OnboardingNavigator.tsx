import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectSchoolScreen from '../screens/Onboarding/SelectSchoolScreen';
import EnterEmailScreen from '../screens/Onboarding/EnterEmailScreen';
import CreateProfileIntroScreen from '../screens/Onboarding/CreateProfileIntroScreen';
import YourNameScreen from '../screens/Onboarding/YourNameScreen';
import GradYearScreen from '../screens/Onboarding/GradYearScreen';
import AddressScreen from '../screens/Onboarding/AddressScreen';
import NotificationPermissionScreen from '../screens/Onboarding/NotificationPermissionScreen';
import WelcomeScreen from '@/screens/Onboarding/WelcomeScreen';

export type OnboardingStackParamList = {
  Welcome: undefined,
  SelectSchool: undefined;
  EnterEmail: undefined;
  CreateProfileIntro: undefined;
  YourName: undefined;
  GradYear: undefined;
  Address: undefined;
  NotificationPermission: undefined;
};

const Stack = createStackNavigator<OnboardingStackParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SelectSchool" component={SelectSchoolScreen} />
      <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
      <Stack.Screen name="CreateProfileIntro" component={CreateProfileIntroScreen} />
      <Stack.Screen name="YourName" component={YourNameScreen} />
      <Stack.Screen name="GradYear" component={GradYearScreen} />
      <Stack.Screen name="Address" component={AddressScreen} />
      <Stack.Screen name="NotificationPermission" component={NotificationPermissionScreen} />
    </Stack.Navigator>
  );
}
