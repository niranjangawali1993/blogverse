'use client';
import { getCurrentUser } from '@/services/userService';
import { ReactNode, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getCurrentUserData() {
      try {
        if (!user) {
          const loggedInUser = await getCurrentUser();
          const userData = loggedInUser.user ? loggedInUser.user : undefined;
          if (loggedInUser) setUser({ ...userData });
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCurrentUserData();
  }, []);

  const values = { user, setUser };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
