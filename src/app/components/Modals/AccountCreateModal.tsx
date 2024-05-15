import React, { memo } from 'react';
import googleIcon from './../../../../public/icons/icons8-google.svg';
import FBIcon from './../../../../public/icons/icons8-facebook.svg';
import emailIcon from './../../../../public/icons/email-svgrepo-com.svg';
import crossIcon from './../../../../public/icons/cross-svgrepo-com.svg';

import Image from 'next/image';
import Link from 'next/link';
import { AccountCreateModalProps } from '@/lib';

const AccountCreateModal = ({
  managePopupVisibility,
  managePopupState,
}: AccountCreateModalProps) => {
  return (
    <div>
      <div
        aria-hidden='true'
        className={`${
          !managePopupVisibility ? 'hidden' : ''
        } overflow-y-auto overflow-x-hidden fixed flex justify-center z-500 items-center w-full md:inset-0 max-h-full h-screen backdrop-blur bg-white bg-opacity-80 z-100`}
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            {/* <!-- Modal body --> */}
            <div className='p-4 md:p-5 space-y-4'>
              <div
                className='flex justify-end pr-3 pt-1 cursor-pointer'
                onClick={() => managePopupState(false)}
              >
                <Image src={crossIcon} alt='Cross Icon' className='w-5' />
              </div>
              <div className='px-10 py-20'>
                <p className='text-center text-3xl font-normal'>Join Medium.</p>
                <div className='flex flex-col mt-20 mx-20'>
                  <div className='relative'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                      <Image
                        src={googleIcon}
                        alt='Google Icon'
                        style={{ width: '50%' }}
                      />
                    </div>

                    <label
                      id='google-icon'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full ps-10 p-2.5 text-center cursor-pointer'
                    >
                      Sign up with Google
                    </label>
                  </div>

                  <div className='relative mt-5'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                      <Image
                        src={FBIcon}
                        alt='Facebook Icon'
                        style={{ width: '50%' }}
                      />
                    </div>

                    <label
                      id='facebook-icon'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full ps-10 p-2.5 text-center cursor-pointer'
                    >
                      Sign up with Facebook
                    </label>
                  </div>

                  <div className='relative mt-5'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
                      <Image
                        src={emailIcon}
                        alt='Email Icon'
                        style={{ width: '5%' }}
                      />
                    </div>

                    <label
                      id='email-icon'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full ps-10 p-2.5 text-center cursor-pointer'
                    >
                      Sign up with Email
                    </label>
                  </div>
                </div>

                <div className='mt-10 text-center'>
                  <span>
                    Already have an account?{' '}
                    <Link className='text-green-400 font-bold' href={'#'}>
                      Sign in
                    </Link>
                  </span>
                </div>

                <div className='mt-12 text-center'>
                  <p className='text-xs text-gray-500'>
                    Click “Sign up” to agree to Medium’s
                    <Link href={'#'} className='underline'>
                      {' '}
                      Terms of Service
                    </Link>{' '}
                    and acknowledge that Medium’s{' '}
                    <Link href={'#'} className='underline'>
                      Privacy Policy
                    </Link>{' '}
                    applies to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MemorizedAccountCreateModal = memo(AccountCreateModal);
export default AccountCreateModal;
