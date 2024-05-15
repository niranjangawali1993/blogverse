'use client';
import { ReactNode, useEffect, useState } from 'react';
import { CommonContext } from './CommonContext';

export const CommonContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [headerBg, setHeaderBg] = useState(false);
  const [openPopup, managePopup] = useState(false);
  const [displaySignUpForm, manageFormDisplay] = useState(true);

  useEffect(() => {
    const body = document.body;
    // When the popup is open, we want to prevent scrolling on the body
    if (openPopup) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [openPopup]);

  const values = {
    headerBg,
    setHeaderBg,
    openPopup,
    managePopup,
    displaySignUpForm,
    manageFormDisplay,
  };
  return (
    <CommonContext.Provider value={values}>{children}</CommonContext.Provider>
  );
};
