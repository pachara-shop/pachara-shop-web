import { auth } from '@/config/firebaseConfig';
import { createSession, deleteSession } from '@/lib/session';
import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

const AuthContext = createContext<any>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const token = await user?.getIdToken();
      if (user) {
        if (token) {
          createSession('session_token', token);
        }
        setCurrentUser(user);
      } else {
        deleteSession('session_token');
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    userInfo,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
