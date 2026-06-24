import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { clearAuthToken, getAuthToken, saveAuthToken } from '../storage/authStorage';

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthToken()
      .then(setToken)
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isLoading,
      token,
      async signIn(nextToken: string) {
        await saveAuthToken(nextToken);
        setToken(nextToken);
      },
      async signOut() {
        await clearAuthToken();
        setToken(null);
      },
    }),
    [isLoading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider.');
  }

  return context;
}
