'use client';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Logo';
import writeSVG from './../../../../public/icons/write-svgrepo-com.svg';
import bellSVG from './../../../../public/icons/bell-svgrepo-com.svg';

import Image from 'next/image';
import Link from 'next/link';
import ProfileMenu from './ProfileMenu';
import { useParams, usePathname } from 'next/navigation';
import useUserContext from '@/hooks/usrUserContext';
import Search from './Search';
import { getBlogById } from '@/services/blogService';

const LoggedInHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { user } = useUserContext();
  const [selectedBlog, setDataForSelectedBlog] = useState(undefined);

  const params = useParams();
  const { blogId } = params;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false); // Hide the menu if clicking outside ref'd element
      }
    };

    // Only add the event listener if the menu is visible
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup listener to prevent memory leaks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const getBlog = async (blogId: string) => {
    const result = await getBlogById(blogId);
    setDataForSelectedBlog(result.data);
  };

  useEffect(() => {
    if (typeof blogId === 'string') {
      getBlog(blogId);
    }
  }, [blogId]);

  return (
    <div className='flex flex-row justify-between items-center border-b border-black p-4'>
      <div>
        <div className='flex flex-row px-2'>
          <div className='flex items-center'>
            <Logo showTitle={false} isInternalHeader={true} />
          </div>
          <div className='ml-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <Search />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center'>
        {!pathname.includes('dashboard/') && (
          <div>
            <Link
              href={'/create-blog'}
              className='flex items-center font-thin cursor-pointer'
            >
              <Image src={writeSVG} className='w-6 mr-2' alt='write icon' />
              Write
            </Link>
          </div>
        )}
        {pathname.includes('dashboard/') &&
          user &&
          user?._id == selectedBlog?.author && (
            <div>
              <Link
                href={`/edit-blog/${blogId}`}
                className='flex items-center font-thin cursor-pointer'
              >
                <Image src={writeSVG} className='w-6 mr-2' alt='write icon' />
                Edit
              </Link>
            </div>
          )}
        <div className='mx-12 cursor-pointer'>
          <Image src={bellSVG} className='w-6' alt='bell icon' />
        </div>
        <div ref={menuRef}>
          <div
            className='flex justify-center items-center h-10 w-10 bg-green-500 rounded-full text-white cursor-pointer'
            onClick={toggleMenu}
          >
            {user?.name[0]}
          </div>
          {showMenu && <ProfileMenu />}
        </div>
      </div>
    </div>
  );
};

export default LoggedInHeader;
