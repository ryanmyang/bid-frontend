// screens/Onboarding/GradYearScreen.tsx

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type GradYearScreenProp = StackNavigationProp<OnboardingStackParamList, 'GradYear'>;

export default function GradYearScreen() {
  const navigation = useNavigation<GradYearScreenProp>();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [2024, 2025, 2026, 2027];

  return (
    <View style={[globalStyles.container, styles.background]}>
      <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={globalStyles.heading}>What's Your Grad Year?</Text>

      <View style={styles.yearOptions}>
        {years.map((year) => (
          <TouchableOpacity
            key={year}
            style={[styles.yearButton, selectedYear === year && styles.yearSelected]}
            onPress={() => setSelectedYear(year)}
          >
            <Text>{year}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={globalStyles.progressBarContainer}>
        {/* 50% fill as an example */}
        <View style={[globalStyles.progressBarFill, { width: '50%' }]} />
      </View>

      <PrimaryButton
        title="Continue"
        color={theme.colors.green}
        onPress={() => navigation.navigate('Address')}
        disabled={!selectedYear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.greenLight,
  },
  yearOptions: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  yearButton: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: 8,
    margin: theme.spacing.xs,
  },
  yearSelected: {
    borderWidth: 2,
    borderColor: theme.colors.green,
  },
});
