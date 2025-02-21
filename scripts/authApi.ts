// authApi.ts
import { request } from './apiClient';
import { saveTokens, removeTokens } from './authStorage';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  // plus any other user fields from your backend
}

/** Log in with email/password, store tokens */
export async function login(email: string, password: string) {
  const data: LoginResponse = await request('/user/login', {
    method: 'POST',
    body: { email, password },
  }, true);
  // On success, store the tokens
  console.log(`Attempted logging into back end. ${JSON.stringify(data)}`)
  console.log(`Refresh Token: ${data.refresh_token}`)
  await saveTokens(data.access_token, data.refresh_token);
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
