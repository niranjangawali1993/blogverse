'use client';

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import Link from 'next/link';
import useCommonContext from '@/hooks/useCommonContext';
import { usePathname } from 'next/navigation';
import { MemorizedAccountModal } from './Modals/AccountModal';

const Header = () => {
  const {
    headerBg,
    managePopup,
    openPopup,
    displaySignUpForm,
    manageFormDisplay,
  } = useCommonContext();

  const pathName = usePathname();

  const openAuthenticationForm = (formStatus: boolean) => {
    managePopup(!openPopup);
    manageFormDisplay(formStatus);
  };

  return (
    <div
      className={`flex flex-row justify-evenly items-center h-20 dark:bg-black fixed top-0 left-0 w-full border-b border-black color-transition p-10 z-40 ${
        pathName !== '/' ? 'bg-white' : headerBg ? 'bg-white' : 'bg-yellow-400'
      }`}
    >
      <div className='flex-1'>
        <div className='grid grid-cols-12'>
          <div className='col-start-3'>
            <Logo />
          </div>
        </div>
      </div>
      <div className='flex-1 text-black dark:text-white text-sm'>
        <div className='flex flex-row justify-center'>
          <div className='hidden md:block mx-3.5'>
            <Link href='/about'>Our story</Link>
          </div>

          <div className='hidden md:block mx-3.5'>
            <Link href={'/membership'}>Membership</Link>
          </div>

          <div className='hidden md:block mx-3.5'>
            <Link href={'/partner-program'}>Write</Link>
          </div>
          <div className='mx-3.5'>
            <Link
              href={'#'}
              className={`py-3 px-4 rounded-3xl text-white ${
                headerBg ? 'bg-green-600' : 'bg-black'
              }`}
              onClick={() => openAuthenticationForm(true)}
            >
              Get Started
            </Link>
          </div>
          <div className='mx-3.5'>
            <Link href={'#'} onClick={() => openAuthenticationForm(false)}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <MemorizedAccountModal
        managePopupVisibility={openPopup}
        managePopupState={managePopup}
        authenticationForm={displaySignUpForm}
      />
    </div>
  );
};

export default Header;
