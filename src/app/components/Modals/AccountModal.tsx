import Image from 'next/image';
import React, { FormEvent, memo, useEffect, useState } from 'react';
import crossIcon from './../../../../public/icons/cross-svgrepo-com.svg';
import Link from 'next/link';
import { z } from 'zod';
import {
  AccountModalProps,
  LoginFormValidationSchema,
  LoginModelType,
  SignUpModelType,
} from '@/lib';
import { loginUser, signUpUser } from '@/services/userService';
import { showError } from '@/lib/toastNotifications';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Signup from '../Auth/Signup';
import Login from '../Auth/Login';

const AccountModal = ({
  managePopupVisibility,
  managePopupState,
  authenticationForm,
}: AccountModalProps) => {
  const [displaySignUpForm, manageFormDisplay] = useState(true);

  useEffect(() => {
    console.log('HERE WE ARE GETTING FORM TYPE THAT WE ARE GOING TO OPEN');
    console.log(authenticationForm);
    manageFormDisplay(authenticationForm);
  }, [authenticationForm]);

  const closePopup = () => {
    managePopupState(false);
  };

  const changeAuthenticationForm = (formStatus: boolean) => {
    manageFormDisplay(formStatus);
  };

  return (
    <div>
      <div
        aria-hidden='true'
        className={` ${
          !managePopupVisibility ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed flex justify-center z-50 items-center w-full md:inset-0 max-h-full h-screen backdrop-blur bg-white bg-opacity-80 z-100`}
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full h-full'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div
              className='flex justify-end p-5 cursor-pointer text-gray-300'
              onClick={closePopup}
            >
              <Image src={crossIcon} alt='Cross Icon' className='w-5' />
            </div>
            <div className='p-4 md:p-28'>
              {!displaySignUpForm && (
                <Login
                  managePopupState={managePopupState}
                  changeAuthenticationForm={changeAuthenticationForm}
                />
              )}
              {displaySignUpForm && (
                <Signup
                  managePopupState={managePopupState}
                  changeAuthenticationForm={changeAuthenticationForm}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MemorizedAccountModal = memo(AccountModal);

export default AccountModal;

{
  /* ERROR FOR SPECIFIC FIELD */
}
{
  /* {hasError('name') && (
                      <p className='text-red-500 text-xs mt-1'>
                        {getErrorMessage('name')}
                      </p>
                    )} */
}
