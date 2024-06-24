'use client';
import api from '@/api';
import { setUserDetails } from '@/store/userSlice';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const UserContext = createContext(null);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetch(api.profile.url, {
          method: api.profile.method,
          credentials: 'include',
        }).then((res) => res.json());
        if (userData.success) {
          dispatch(setUserDetails(userData.data) as any);
        }
        setUser(userData);
      } catch (error: any) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const user = useContext(UserContext as any);
  if (user === undefined) {
    console.log('Searching User');
  }
  return user;
};
