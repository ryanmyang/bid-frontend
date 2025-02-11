import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../styles/theme';

interface DistanceSliderProps {
  value: number;
  onChange: (val: number) => void;
}

export default function DistanceSlider({ value, onChange }: DistanceSliderProps) {
  return (
    <View style={styles.container}>
      <Slider
        style={{ flex: 1 }}
        minimumValue={1}
        maximumValue={50}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={theme.colors.orange}
        maximumTrackTintColor="#ccc"
        thumbTintColor={theme.colors.orange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
