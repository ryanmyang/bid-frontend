// authStorage.ts
import * as SecureStore from 'expo-secure-store';

const ACCESS_KEY = 'BID_APP_ACCESS_TOKEN';
const REFRESH_KEY = 'BID_APP_REFRESH_TOKEN';

export async function saveTokens(accessToken: string, refreshToken?: string) {
  await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
  
  if (refreshToken) {
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
  }
}

export async function getTokens() {
  const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);
  return { accessToken, refreshToken };
}

export async function removeTokens() {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}
