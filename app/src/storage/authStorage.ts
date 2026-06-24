let inMemoryToken: string | null = null;

export async function getAuthToken(): Promise<string | null> {
  return inMemoryToken;
}

export async function saveAuthToken(token: string): Promise<void> {
  inMemoryToken = token;
}

export async function clearAuthToken(): Promise<void> {
  inMemoryToken = null;
}
