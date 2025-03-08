// authApi.ts
import { request } from './apiClient';
import { saveTokens, removeTokens, getTokens } from './authStorage';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  // plus any other user fields from your backend
}

/** Log in with email/password, store tokens */
import axios from 'axios';

export async function login(email: string, password: string) {
  console.log('Logging in');
  // Change BASE_URL if needed
  const BASE_URL = 'http://127.0.0.1:5000/api/v1';

  const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, {
    email,
    password,
  });

  const data = response.data;
  await saveTokens(data.access_token, data.refresh_token);
  const tokens = await getTokens();
  console.log(`Logged in, received tokens ${JSON.stringify(tokens)}`)
  return data;
}

/** Remove tokens from storage (logout) */
export async function logout() {
  await removeTokens();
  // Optionally call server endpoint to invalidate refresh token
}

/** Example: get the current user's info (authenticated request) */
export async function getCurrentUser() {
  const data = await request('/user/me');
  return data; // your user object
}
