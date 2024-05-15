import Link from 'next/link';
import React from 'react';
import profileSVG from './../../../../public/icons/profile-svgrepo-com.svg';
import storiesSVG from './../../../../public/icons/book-svgrepo-com.svg';
import statsSVG from './../../../../public/icons/stats-1366-svgrepo-com.svg';
import librarySVG from './../../../../public/icons/bookmark-svgrepo-com.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/services/userService';
import Swal from 'sweetalert2';

const ProfileMenu = () => {
  const router = useRouter();
  const logout = async () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: '!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then(async (result) => {
      console.log(result);
      if (result.isConfirmed) {
        await logoutUser();
        router.push('/');
      }
    });
  };
  return (
    <div>
      <div className='absolute right-0 mt-2 py-2 w-72 bg-white rounded-md shadow-xl z-20'>
        <div className='border-b mb-2'>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            <Image
              src={profileSVG}
              alt='profile'
              className='w-8 h-8 mr-4 bg-white'
            />
            Profile
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            <Image
              src={librarySVG}
              alt='profile'
              className='w-6 h-6 mr-4 bg-white'
            />
            Library
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            <Image
              src={storiesSVG}
              alt='profile'
              className='w-6 h-6 mr-4 bg-white'
            />
            Stories
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500 mb-2'
          >
            <Image
              src={statsSVG}
              alt='profile'
              className='w-5 h-5 mr-4 bg-white'
            />
            Stats
          </Link>
        </div>

        <div className='mt-2 border-b mb-2'>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            Settings
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            Refine recommendations
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500'
          >
            Manage publications
          </Link>
          <Link
            href='/profile'
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500 mb-2'
          >
            Help
          </Link>
        </div>

        <div>
          <span
            className='flex items-center px-4 py-2 text-sm hover:text-black font-normal text-gray-500 cursor-pointer'
            onClick={logout}
          >
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
