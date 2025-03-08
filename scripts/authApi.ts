// authApi.ts
import { request, BASE_URL } from './apiClient';
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


export async function completeTask(taskId: string): Promise<any> {
  return await request('/user/completed-task', {
    method: 'POST',
    body: { task_id: taskId },
  });
}