import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
  iosClientId: '227625341213-oit93acmhg0195vlh4o1scb36ojqfbm9.apps.googleusercontent.com',
});

const LoginScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Check if the user is already signed in
  useEffect(() => {
    const checkIfSignedIn = async () => {
      try {
        const user = await GoogleSignin.signInSilently();

        if (user != null && user.data == null){
          throw { code: statusCodes.SIGN_IN_REQUIRED, message: "User needs to sign in." };
        }
        
        console.log('User signed in silently:', user);
        setUserInfo(user);
        setIsSignedIn(true);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
          console.log('User is not signed in silently');
        } else {
          console.error('Error checking silent sign-in status:', error);
        }
        setIsSignedIn(false); // Ensure the state reflects sign-in status
      }
    };

    checkIfSignedIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available (for Android, not required on iOS)
      const user = await GoogleSignin.signIn(); // Start the sign-in flow
      console.log('User signed in:', user);
      setUserInfo(user); // Update state with user info
      setIsSignedIn(true); // Mark as signed in
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-in already in progress');
      } else {
        Alert.alert('Error signing in', error.message);
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut(); // Sign the user out
      setUserInfo(null); // Clear user info
      setIsSignedIn(false); // Mark as signed out
      Alert.alert('Signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error signing out', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {isSignedIn && userInfo && userInfo.data.user ? (
        <View>
          <Text style={styles.title}>Welcome, {userInfo.data.user.name}</Text>
          <Text>Email: {userInfo.data.user.email}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <Button title="Sign in with Google" onPress={signIn} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LoginScreen;
