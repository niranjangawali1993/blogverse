'use client';
import React, { memo, useEffect, useRef, useState } from 'react';
import blogBG from './../../assets/blog-background.jpg';
import Link from 'next/link';
import Image from 'next/image';
import Blog from '@/interfaces/Blog.interface';
import bookmarkBG from '../../../../public/icons/book-mark.svg';
import menuBG from '../../../../public/icons/more.svg';
import { usePathname, useRouter } from 'next/navigation';
import { MemorizedAccountModal } from '../Modals/AccountModal';
import { useUserContext } from '@/hooks';

type SingleBlogHorizontalViewProps = {
  singleBlog: Blog;
  handleDelete: any;
};

const SingleBlogHorizontalView: React.FC<SingleBlogHorizontalViewProps> = ({
  singleBlog,
  handleDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [openPopup, managePopup] = useState(false);
  const [displaySignUpForm, manageFormDisplay] = useState(true);
  const { user } = useUserContext();

  // Hide dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigateToBlogDetails = (id: string) => {
    if (pathname == '/dashboard') {
      router.push(`/dashboard/${id}`);
    } else if (pathname == '/') {
      console.log('SECOND PATH');
      openAuthenticationForm(false);
    }
  };

  const openAuthenticationForm = (formStatus: boolean) => {
    managePopup(!openPopup);
    manageFormDisplay(formStatus);
  };

  // Handle edit operation
  const handleEditClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Edit clicked');
    router.push(`/edit-blog/${singleBlog._id}`);
  };

  // Handle delete operation
  const handleDeleteClick = async (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Delete clicked ', singleBlog._id);
    await handleDelete(singleBlog._id);
  };

  return (
    <div className='py-4' key={singleBlog._id}>
      <div
        className='flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-4xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 h-full cursor-pointer'
        onClick={() => navigateToBlogDetails(singleBlog._id)}
      >
        <Image
          src={blogBG}
          className='object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
          alt={singleBlog.title}
          width={192}
          height={192}
        />
        <div className='flex flex-col justify-between flex-grow px-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {singleBlog.title}
          </h5>
          <p
            className='mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2'
            dangerouslySetInnerHTML={{ __html: singleBlog.content }}
          ></p>
          <div className='flex flex-col justify-between flex-grow'>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              {new Date(singleBlog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className='flex flex-row justify-between items-end pt-4'>
              <div className='text-xs font-normal'>
                <div className='mt-2'>
                  {singleBlog?.tags.map((singleTag: any) => {
                    return (
                      <span className='bg-gray-100 p-2 mx-2 rounded-full'>
                        {singleTag.name}
                      </span>
                    );
                  })}
                </div>

                {/* <span className='mx-2'>10 min read</span> */}
              </div>
              {user && user?._id == singleBlog?.author && (
                <div className='flex items-center'>
                  <button className='cursor-pointer'>
                    <Image
                      src={bookmarkBG}
                      alt='Bookmark'
                      width={20}
                      height={20}
                    />
                  </button>

                  <div className='relative'>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setShowMenu((prev) => !prev);
                      }}
                      className='cursor-pointer'
                    >
                      <Image src={menuBG} alt='Menu' width={20} height={20} />
                    </button>
                    {showMenu && (
                      <div
                        ref={menuRef}
                        className='absolute right-0 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-100'
                        onClick={(event) => event.stopPropagation()} // Stop propagation here too
                      >
                        <ul className='text-gray-700'>
                          <li
                            className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
                            onClick={handleEditClick}
                          >
                            Edit
                          </li>
                          <li
                            className='block px-4 py-2 cursor-pointer hover:bg-gray-100'
                            onClick={handleDeleteClick}
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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

export const SingleBlogHorizontalViewLazy = memo(SingleBlogHorizontalView);

export default SingleBlogHorizontalView;
