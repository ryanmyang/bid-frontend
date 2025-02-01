// screens/Onboarding/AddressScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';
import { theme } from '../../styles/theme';

type AddressScreenProp = StackNavigationProp<OnboardingStackParamList, 'Address'>;

export default function AddressScreen() {
  const navigation = useNavigation<AddressScreenProp>();
  const [address, setAddress] = useState('');
  const [apt, setApt] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  return (
    <View style={[globalStyles.container, styles.background]}>
      <TouchableOpacity style={globalStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18 }}>←</Text>
      </TouchableOpacity>

      <Text style={globalStyles.heading}>Where Do You Live?</Text>

      <TextInput
        style={styles.input}
        placeholder="Residential Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Apartment & floor/unit"
        value={apt}
        onChangeText={setApt}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <View style={globalStyles.progressBarContainer}>
        {/* 66% fill as example */}
        <View style={[globalStyles.progressBarFill, { width: '66%' }]} />
      </View>

      <PrimaryButton
        title="Continue"
        color={theme.colors.green}
        onPress={() => navigation.navigate('NotificationPermission')}
        disabled={!address || !postalCode || !city}
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
