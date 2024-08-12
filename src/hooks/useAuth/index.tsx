'use client';

import * as api from '@/api/auth';
import React, { createContext, useCallback, useContext, useState } from 'react';

export type User = {
  isAuthenticated: boolean;
  id: string;
};

export type AuthContextProps = {
  userEmail: string | undefined;
  user: User | undefined;
  signInAnonymously: (userEmail: string) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [userEmail, setUserEmail] = useState('');
  const [user, setUser] = useState<User>();

  const signInAnonymously = useCallback((email: string) => {
    api
      .signInAnonymously()
      .then((user) => {
        setUser(user);
        setUserEmail(email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userEmail,
        signInAnonymously,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
