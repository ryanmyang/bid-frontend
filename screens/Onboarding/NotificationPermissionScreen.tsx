// NotificationPermissionScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { StackNavigationProp} from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useNavigation, CommonActions} from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import * as Notifications from 'expo-notifications';
import { setOnboarded } from '../../storage/onboardingStorage'; // <- import from that new file
// screens/Onboarding/NotificationPermissionScreen.tsx

type NotificationPermissionScreenProp = StackNavigationProp<
  OnboardingStackParamList,
  'NotificationPermission'
>;




export default function NotificationPermissionScreen() {
  const navigation = useNavigation<NotificationPermissionScreenProp>();

  const handleContinue = async () => {
    try {
      // Request permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Notification permissions were not granted. You may not receive important updates.'
        );
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      Alert.alert('Error', 'There was an error requesting notification permissions.');
    }

    // Mark user as onboarded in AsyncStorage
    await setOnboarded();

    // Then reset or navigate to main tabs
    const parentNav = navigation.getParent(); 
    if (!parentNav) {
      // Fallback if somehow there's no parent
      console.warn('No parent navigator found. Cannot navigate to MainTabs.');
      return;
    }

    parentNav.dispatch(
      CommonActions.navigate({
              name: 'MainTabs',
              params: {},
          }
      ))

  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={globalStyles.heading}>Please Allow Notifications</Text>
      <Text style={globalStyles.subtext}>
        We’ll notify you about new bids, messages, and important updates.
      </Text>

      <View style={globalStyles.progressBarContainer}>
        <View style={[globalStyles.progressBarFill, { width: '100%' }]} />
      </View>

      <PrimaryButton title="Continue" color={theme.colors.blueLight} onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.blueLight,
  },
});
