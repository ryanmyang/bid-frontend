import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type WelcomeScreenProp = StackNavigationProp<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenProp>();

  const handleContinue = () => {
    navigation.navigate('SelectSchool'); // Move to the existing first onboarding screen
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.textContainer}>
        <Text style={globalStyles.heading}>Welcome to Bid</Text>
        <Text style={globalStyles.subtext}>
          A platform to connect bidders and taskers. Let’s get started!
        </Text>
      </View>

      {/* Continue Button */}
      <PrimaryButton title="Continue" onPress={handleContinue} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.orangeLight,
    flex: 1,
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    paddingHorizontal: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30, // Space between logo and welcome text
  },
  logo: {
    width: 180,
    height: 180,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10, // Space between text and button
  },
  button: {
    marginTop: 10, // Optional, if extra spacing is needed
  },
});