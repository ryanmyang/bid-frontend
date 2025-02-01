// screens/Onboarding/CreateProfileIntroScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type CreateProfileIntroScreenProp = StackNavigationProp<
  OnboardingStackParamList,
  'CreateProfileIntro'
>;

export default function CreateProfileIntroScreen() {
  const navigation = useNavigation<CreateProfileIntroScreenProp>();

  return (
    <View style={[globalStyles.container, styles.background]}>
      <Text style={globalStyles.heading}>Create Your Profile</Text>
      <Text style={globalStyles.subtext}>
        Let’s customize your account so bidders and posters know who you are.
      </Text>
      <PrimaryButton
        title="Continue"
        onPress={() => navigation.navigate('YourName')}
        color={theme.colors.green}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.greenLight, // #90EE90AA
  },
});
