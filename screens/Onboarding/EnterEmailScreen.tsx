// screens/Onboarding/EnterEmailScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import { login } from '../../scripts/authApi';


// Configure Google Sign-In (same as your LoginScreen)
GoogleSignin.configure({
  iosClientId: '227625341213-oit93acmhg0195vlh4o1scb36ojqfbm9.apps.googleusercontent.com',
});

type EnterEmailScreenProp = StackNavigationProp<OnboardingStackParamList, 'EnterEmail'>;

export default function EnterEmailScreen() {
  const navigation = useNavigation<EnterEmailScreenProp>();
  
  // Track user sign-in status
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already signed in silently
  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const user = await GoogleSignin.signInSilently();

        // If user.data is null, that means they really need to sign in again
        if (user != null && user.data == null) {
          throw { code: statusCodes.SIGN_IN_REQUIRED, message: 'User needs to sign in.' };
        }

        // Successfully got user info
        setUserInfo(user);
        setIsSignedIn(true);

        // Log into api client to store JWT token to device
        const log_res = login(user.email, user.google_id);
        console.log(JSON.stringify(log_res))

        // Since they're already signed in, move on to the next onboarding step
        navigation.navigate('CreateProfileIntro');
      } catch (error: any) {
        // Not signed in silently or there's an error
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          // User is not silently signed in
          setIsSignedIn(false);
        } else {
          console.error('Error checking silent sign-in status:', error);
        }
      } finally {
        setIsLoading(false); // Done loading either way
      }
    };

    checkIfSignedIn();
  }, [navigation]);

  const moveOn = () => {
    navigation.navigate('CreateProfileIntro');
  }

  // Initiate Google sign-in flow
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // For Android devices (safe to call on iOS too)
      const signinResponse = await GoogleSignin.signIn(); // Opens the Google sign-in flow
      console.log(`response: ${JSON.stringify(signinResponse)}`)
      const user = signinResponse.data?.user
      setUserInfo(user);
      console.log(`User info: ${JSON.stringify(user)}`)
      setIsSignedIn(true);
      login(user.email, '12345');
      

      // Once signed in, proceed to the next page
      navigation.navigate('CreateProfileIntro');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-in already in progress');
      } else {
        Alert.alert('Error signing in', error.message);
      }
    }
  };

  // If still checking silent sign-in, show a loading indicator
  if (isLoading) {
    return (
      <View style={[globalStyles.container, styles.background]}>
        <ActivityIndicator size="large" color={theme.colors.orange} />
      </View>
    );
  }

  // Otherwise, show the "Continue with Google" button
  return (
    <View style={[globalStyles.container, styles.background]}>
      <Text style={globalStyles.heading}>Enter Your Email</Text>
      <Text style={globalStyles.subtext}>
        We’ll verify your email with Google to secure your account.
      </Text>

      <PrimaryButton
        title="Continue with Google"
        onPress={signInWithGoogle}
        color={theme.colors.orange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.orangeMid, // #FFA50055
  },
});
