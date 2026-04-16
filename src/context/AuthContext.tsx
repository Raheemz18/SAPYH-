import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '@/src/lib/firebase';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'tournament' | 'ranking' | 'system';
  read: boolean;
  createdAt: any;
  link?: string;
}

interface AuthContextType {
  user: User | null;
  profile: any | null;
  role: 'player' | 'parent' | 'organizer' | 'admin' | null;
  notifications: Notification[];
  loading: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  role: null,
  notifications: [],
  loading: true,
  isAuthReady: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [role, setRole] = useState<'player' | 'parent' | 'organizer' | 'admin' | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
      if (!user) {
        setProfile(null);
        setRole(null);
        setNotifications([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const profilePath = `users/${user.uid}`;
      const unsubProfile = onSnapshot(
        doc(db, 'users', user.uid),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setProfile(data);
            setRole(data.role);
          } else {
            setProfile(null);
            setRole(null);
          }
          setLoading(false);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, profilePath);
          setLoading(false);
        }
      );

      const notificationsPath = `users/${user.uid}/notifications`;
      const unsubNotifications = onSnapshot(
        query(collection(db, 'users', user.uid, 'notifications'), orderBy('createdAt', 'desc')),
        (snapshot) => {
          const newNotifications = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Notification[];
          setNotifications(newNotifications);
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, notificationsPath);
        }
      );

      return () => {
        unsubProfile();
        unsubNotifications();
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, profile, role, notifications, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};
