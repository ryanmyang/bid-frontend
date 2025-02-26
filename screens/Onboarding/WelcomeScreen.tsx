import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';
import { login } from '../../scripts/authApi';
import { request } from '@/scripts/apiClient';
import { getTokens } from '@/scripts/authStorage';
import axios from 'axios';
import { JobsAPI, JobResponse } from '@/scripts/jobsClient';

type WelcomeScreenProp = StackNavigationProp<OnboardingStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeScreenProp>();

  const handleContinue = async () => {
    try {
      // const log_res = await login('ryanmyangspam@gmail.com', '12345');
      // console.log(log_res);
      // const tokens = await getTokens();
      // console.log(`Auth header to use: ${JSON.stringify(tokens.accessToken)}`);
      // let jobs = await JobsAPI.getJobs(1,5);
      // console.log(`Jobs: ${JSON.stringify(jobs)}`);

        navigation.navigate('SelectSchool'); // Move to the existing first onboarding screen
    } catch (error) {
        let message = "unknown error";
        let response = {}
        if (error instanceof Error) {
          message = error.message
        }
        console.error('Error during request:', message);
    }
};

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/bid_logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      {/* <View style={styles.textContainer}>
        <Text style={globalStyles.heading}>Welcome to Bid</Text>
        <Text style={globalStyles.subtext}>
          A platform to connect bidders and taskers. Let’s get started!
        </Text>
      </View> */}

      {/* Continue Button */}
      <PrimaryButton color = "#ED8034" title="Continue" onPress={handleContinue} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#182443',
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
    borderRadius: 90, // makes the image circular
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 10, // Space between text and button
  },
  button: {
    marginTop: 10, // Optional, if extra spacing is needed
    backgroundColor: '#ED8034'
  },
});