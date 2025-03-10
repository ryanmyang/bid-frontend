// apiClient.ts

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokens, saveTokens, removeTokens } from './authStorage';

export const BASE_URL = 'http://127.0.0.1:5000/api/v1';
let isAlreadyRefreshing = false;



/**
 * Main request wrapper with automatic token refresh.
 */
interface ExtendedRequestOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'headers' | 'data'> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string | undefined>;
}

export async function request<T = any>(
  endpoint: string,
  { method = 'GET', body, headers = {}, ...customConfig }: ExtendedRequestOptions = {},
  retryAttempt = false
): Promise<T> {
  console.log(`\n\n----------------------- OUTGOING REQUEST --------------------\n Endpoint: ${endpoint}, Method: ${method}, Body: ${JSON.stringify(body)}\n`)
  const { accessToken } = await getTokens();

  // Build final headers
  const finalHeaders: Record<string, string> = {};
  // Convert any headers with `undefined` or falsey values to avoid Axios type errors
  for (const [key, val] of Object.entries(headers)) {
    if (val) finalHeaders[key] = val;
  }

  // Optionally set Authorization if you have one
  if (accessToken && !finalHeaders['X-Authorization']) {
    finalHeaders['X-Authorization'] = `Bearer ${accessToken}`;
  }

  // If body is an object (and not FormData), we convert to JSON
  let data = body;
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    data = JSON.stringify(body);
    finalHeaders['Content-Type'] = finalHeaders['Content-Type'] ?? 'application/json';
  }

  // Build Axios config
  const config: AxiosRequestConfig = {
    method,
    url: `${BASE_URL}${endpoint}`,
    headers: finalHeaders,
    data,
    ...customConfig,
  };

  // Make request
  let response: AxiosResponse|null = null;
  try {
    response = await axios<T>(config);
  } catch (error) {
    
    console.log(`Error casting request from apiClient ${error}`);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && retryAttempt == false) {
        console.log('401 Error, attempting token refresh');
        attemptTokenRefresh();
        request(endpoint, {method, body, headers, ...customConfig}, true);
      }
    }
  }
  console.log(`\n----------------------- REQUEST RESPONSE --------------- ${JSON.stringify(response?.data)} \n-----------------------\n\n`)
  return response?.data; // No "return await" => no lint error
}

/**
 * Refresh access token using the refresh token.
 */
async function attemptTokenRefresh(): Promise<boolean> {
  if (isAlreadyRefreshing) return false;
  isAlreadyRefreshing = true;

  try {
    const { refreshToken } = await getTokens();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await axios.post(`${BASE_URL}/user/token/refresh`, null, {
      headers: { 'X-Authorization': `Bearer ${refreshToken}` },
    });

    const { access_token, refresh_token } = response.data;

    if (access_token && refresh_token) {
      await saveTokens(access_token, refresh_token); // Save both tokens
      console.log('🔑 Token refreshed successfully');
      return true;
    }

    throw new Error('Refresh response missing tokens');
  } catch (error) {
    console.error('⚠️ Token refresh failed:', error);
    await removeTokens();
    return false;
  } finally {
    isAlreadyRefreshing = false;
  }
}