import { LoginFormValidationSchema, SignUpModelType } from '@/lib';
import { showError, showSuccess } from '@/lib/toastNotifications';
import { signUpUser } from '@/services/userService';
import React, { FormEvent, useState } from 'react';
import { z } from 'zod';

const Signup = ({ managePopupState, changeAuthenticationForm }: any) => {
  const initialSignUpForm: SignUpModelType = {
    name: '',
    email: '',
    password: '',
  };
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm);
  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);

  const manageSignUpFormFields = (fieldName: string, fieldValue: string) => {
    setSignUpForm({ ...signUpForm, [fieldName]: fieldValue });
    if (formErrors) {
      const updatedErrors = formErrors.errors.filter(
        (error) => error.path[0] !== fieldName
      );
      const newFormErrors = new z.ZodError(updatedErrors);
      setFormErrors(updatedErrors.length > 0 ? newFormErrors : null);
    }
  };

  // Function to check if a specific field has an error
  const hasError = (fieldName: string): any => {
    return formErrors?.errors.some((error) => error.path[0] === fieldName);
  };

  // Function to get error message for a specific field
  const getErrorMessage = (fieldName: string): string | undefined => {
    return formErrors?.errors.find((error) => error.path[0] === fieldName)
      ?.message;
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      LoginFormValidationSchema.parse(signUpForm);
      const result = await signUpUser(signUpForm);
      if (result) {
        showSuccess('Successful sign up!!!');
        setSignUpForm(initialSignUpForm);
        managePopupState(false);
      }

      setFormErrors(null);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.errors[0].message);
        setFormErrors(error);
        showError(error.errors[0].message);
      } else {
        console.error('Unexpected error:', error);
        if (error?.response?.data?.message.includes('E11000'))
          showError('Email id already exists !!!');
        else showError(error.message);
      }
    }
  };

  return (
    <div>
      <div>
        <form className='space-y-10' onSubmit={handleSignUp}>
          <div>
            <input
              type='text'
              name='name'
              id='signup-name'
              className={`bg-gray-50 border ${
                hasError('name') ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              placeholder='Enter your name'
              onChange={(e) => manageSignUpFormFields('name', e.target.value)}
              value={signUpForm.name}
              required
            />
            {/* ERROR FOR SPECIFIC FIELD */}
            {/* {hasError('name') && (
                      <p className='text-red-500 text-xs mt-1'>
                        {getErrorMessage('name')}
                      </p>
                    )} */}
          </div>
          <div>
            <input
              type='email'
              name='email'
              id='signup-email'
              className={`bg-gray-50 border ${
                hasError('name') ? 'border-red-500' : 'border-gray-300'
              } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              placeholder='Enter your mail'
              required
              onChange={(e) => manageSignUpFormFields('email', e.target.value)}
              value={signUpForm.email}
            />
          </div>
          <div className='mt-2'>
            <input
              type='password'
              name='password'
              id='signup-password'
              placeholder='Enter your password'
              className={`bg-gray-50 ${
                hasError('name') ? 'border-red-500' : 'border-gray-300'
              } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              required
              onChange={(e) =>
                manageSignUpFormFields('password', e.target.value)
              }
              value={signUpForm.password}
            />
          </div>

          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Create your account
          </button>
          <div className='flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300'>
            Already have account?
            <button
              type='button'
              className='text-blue-700 hover:underline dark:text-blue-500 ml-1'
              onClick={() => changeAuthenticationForm(false)}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
