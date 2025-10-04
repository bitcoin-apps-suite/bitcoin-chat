'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Simple session context for demo purposes
interface User {
  id: string;
  email: string;
  name: string;
}

interface Session {
  user: User;
}

interface SessionContextType {
  data: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const SessionContext = createContext<SessionContextType>({
  data: null,
  status: 'unauthenticated'
});

export function useSession() {
  return useContext(SessionContext);
}

export function signOut() {
  // Demo function - in real app would handle auth
  console.log('Sign out');
}

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Demo session - in real app would handle actual authentication
  const sessionValue: SessionContextType = {
    data: null, // Set to null for demo
    status: 'unauthenticated'
  };

  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
}