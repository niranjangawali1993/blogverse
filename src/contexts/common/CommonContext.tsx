'use client';

import { CommonContextType } from '@/lib';
import { createContext } from 'react';

const initialContextValues: CommonContextType = {
  headerBg: false,
  setHeaderBg: () => {},
  openPopup: false,
  managePopup: () => {},
  displaySignUpForm: true,
  manageFormDisplay: () => {},
};

export const CommonContext =
  createContext<CommonContextType>(initialContextValues);
