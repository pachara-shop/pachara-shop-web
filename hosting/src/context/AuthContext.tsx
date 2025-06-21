import { auth } from '@/config/firebaseConfig';
import { createSession, deleteSession } from '@/lib/session';
import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AuthContextType {
  currentUser: User | null;
  userInfo: React.MutableRefObject<undefined>;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

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

  const signOut = async () => {
    await auth.signOut();
    deleteSession('session_token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userInfo,
    loading,
    signOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
