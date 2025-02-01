// screens/Onboarding/YourNameScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type YourNameScreenProp = StackNavigationProp<OnboardingStackParamList, 'YourName'>;

export default function YourNameScreen() {
  const navigation = useNavigation<YourNameScreenProp>();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <View style={[globalStyles.container, styles.background]}>
      {/* Back button */}
      <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={globalStyles.heading}>What's Your Name?</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />

      {/* Progress Bar (33% filled as an example) */}
      <View style={globalStyles.progressBarContainer}>
        <View style={[globalStyles.progressBarFill, { width: '33%' }]} />
      </View>

      <PrimaryButton
        title="Continue"
        color={theme.colors.green}
        onPress={() => navigation.navigate('GradYear')}
        disabled={!firstName || !lastName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.greenLight,
  },
  input: {
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: 8,
  },
});
