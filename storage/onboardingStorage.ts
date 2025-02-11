// storage/onboardingStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'HAS_ONBOARDED';

export async function setOnboarded() {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (e) {
    console.error('Error saving onboarding state', e);
  }
}

export async function getOnboarded(): Promise<boolean> {
  try {
    const result = await AsyncStorage.getItem(ONBOARDING_KEY);
    console.log(`Onboarding Storage Value: ${result}`);
    return result === 'true';
  } catch (e) {
    console.error('Error reading onboarding state', e);
    return false;
  }
}
