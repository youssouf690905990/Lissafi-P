import { getAuthToken } from '../storage/authStorage';

export type ApiRequestOptions = RequestInit & {
  token?: string | null;
  skipAuth?: boolean;
};

const DEFAULT_API_URL = 'http://localhost:3000/api/v1';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL;

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const hasJsonBody = contentType?.includes('application/json');
  const payload = hasJsonBody ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? String(payload.message)
        : 'Une erreur est survenue lors de la requête.';

    throw new Error(message);
  }

  return payload as T;
}

export async function apiClient<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { token, skipAuth = false, headers, ...requestOptions } = options;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const accessToken = token ?? (!skipAuth ? await getAuthToken() : null);

  const response = await fetch(`${API_URL}${normalizedPath}`, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  });

  return parseResponse<T>(response);
}
