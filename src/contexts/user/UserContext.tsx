'use client';

import { UserContextType } from '@/lib';
import { createContext } from 'react';

const initialContextValues: UserContextType = {
  user: {},
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialContextValues);
