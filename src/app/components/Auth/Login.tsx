import useUserContext from '@/hooks/usrUserContext';
import { LoginModelType } from '@/lib';
import { showError, showSuccess } from '@/lib/toastNotifications';
import { loginUser } from '@/services/userService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { z } from 'zod';

const Login = ({ managePopupState, changeAuthenticationForm }: any) => {
  const router = useRouter();
  const { setUser } = useUserContext();

  const initialLoginForm: LoginModelType = {
    email: '',
    password: '',
  };

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [formErrors, setFormErrors] = useState<z.ZodError | null>(null);

  const manageLoginFormFields = (fieldName: string, fieldValue: string) => {
    setLoginForm({ ...loginForm, [fieldName]: fieldValue });
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

  // Login form
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log(loginForm);
      const result = await loginUser(loginForm);
      if (result) {
        setUser(result.user);
        showSuccess('Successful Login!!!');
        setLoginForm(initialLoginForm);
        managePopupState(false);
        router.push('/dashboard');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.errors[0].message);
        setFormErrors(error);
        showError(error.errors[0].message);
      } else {
        console.error('Unexpected error:', error);
        if (error?.response?.data?.message)
          showError(error?.response?.data?.message);
        else showError(error.message);
      }
    }
  };

  return (
    <div>
      {/* <div className={`${displaySignUpForm ? 'hidden' : ''}`}> */}
      <div>
        <form className='space-y-10' onSubmit={handleLogin}>
          <div>
            <input
              type='email'
              name='email'
              id='login-email'
              className={`${
                hasError('email') ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              placeholder='Enter your mail'
              value={loginForm.email}
              required
              onChange={(e) => manageLoginFormFields('email', e.target.value)}
            />
          </div>
          <div className='mt-2'>
            <input
              type='password'
              name='password'
              id='login-password'
              placeholder='Enter your password'
              className={`${
                hasError('password') ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
              value={loginForm.password}
              required
              onChange={(e) =>
                manageLoginFormFields('password', e.target.value)
              }
            />
          </div>
          <div className='flex justify-between'>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  type='checkbox'
                  value=''
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                />
              </div>
              <label
                htmlFor='remember'
                className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Remember me
              </label>
            </div>
            <Link
              href='#'
              className='text-sm text-blue-700 hover:underline dark:text-blue-500'
            >
              Lost Password?
            </Link>
          </div>
          <button
            type='submit'
            className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Login to your account
          </button>
          <div className='flex justify-center text-sm font-medium text-gray-500 dark:text-gray-300'>
            Do not have account ?
            <button
              type='button'
              className='text-blue-700 hover:underline dark:text-blue-500 ml-1'
              onClick={() => changeAuthenticationForm(true)}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
