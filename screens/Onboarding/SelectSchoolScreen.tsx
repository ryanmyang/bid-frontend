// screens/Onboarding/SelectSchoolScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type SelectSchoolScreenProp = StackNavigationProp<OnboardingStackParamList, 'SelectSchool'>;

export default function SelectSchoolScreen() {
  const navigation = useNavigation<SelectSchoolScreenProp>();
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const handleContinue = () => {
    // Store the selectedSchool somewhere if needed
    navigation.navigate('EnterEmail');
  };

  return (
    <View style={[globalStyles.container, styles.background]}>
      <Text style={globalStyles.heading}>Select Your School</Text>
      <Text style={globalStyles.subtext}>
        Choose your university to tailor your experience.
      </Text>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedSchool === 'UCLA' && styles.radioSelected,
        ]}
        onPress={() => setSelectedSchool('UCLA')}
      >
        <Text>UCLA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.radioButton,
          selectedSchool === 'USC' && styles.radioSelected,
        ]}
        onPress={() => setSelectedSchool('USC')}
      >
        <Text>USC</Text>
      </TouchableOpacity>

      <PrimaryButton title="Continue" onPress={handleContinue} disabled={!selectedSchool} />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.orangeLight, // #FFA50033
  },
  radioButton: {
    width: '100%',
    padding: theme.spacing.md,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    marginVertical: theme.spacing.xs,
  },
  radioSelected: {
    borderWidth: 2,
    borderColor: theme.colors.orange,
  },
});
