'use client';
import { useDebouncer } from '@/hooks';
import { BlogType } from '@/lib';
import { searchBlogByTitle } from '@/services/blogService';
import React, { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [inputSearchText, setInputSearchText] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [showSearchBox, manageSearchBox] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onInputChanged = (fieldValue: string) => {
    console.log('Input changed => ', fieldValue);
    setInputSearchText(fieldValue);
  };

  const searchBlogs = async (title: string) => {
    if (title) {
      const result = await searchBlogByTitle(title);
      setBlogs(result.data);
    } else if (title.length == 0) {
      setBlogs([]);
    }
  };

  useDebouncer(searchBlogs, inputSearchText, 1000);

  // useEffect(() => {
  //   searchBlogs(inputSearchText);
  // }, [inputSearchText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        manageSearchBox(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToBlogDetail = (blogId: string) => {
    manageSearchBox(false);
    setInputSearchText('');
    router.push(`/dashboard/${blogId}`);
  };

  return (
    <div ref={searchRef}>
      <input
        type='search'
        id='blog-search'
        className='block min-w-72 p-3 ps-10 text-sm text-gray-900 rounded-3xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white border-none focus:border-none focus:shadow-none focus:outline-none'
        placeholder='Search'
        onChange={(e) => onInputChanged(e.target.value)}
        value={inputSearchText}
        onFocus={() => manageSearchBox(true)}
        autoComplete='off'
        required
      />

      {showSearchBox && (
        <div className='absolute w-full md:w-96 mt-1 max-h-60 shadow-xl rounded-lg bg-white p-4 z-50 overflow-y-auto'>
          {inputSearchText.trim() !== '' &&
            (blogs?.length > 0 ? (
              blogs.map((singleBlog: any) => (
                <div
                  key={singleBlog._id}
                  className='p-3 my-2 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out'
                  onClick={() => goToBlogDetail(singleBlog._id)}
                >
                  <h2 className='text-md font-semibold text-gray-800'>
                    {singleBlog.title}
                  </h2>
                  <p className='text-sm text-gray-600 mt-1 line-clamp-2 overflow-hidden overflow-ellipsis'>
                    {singleBlog.content}
                  </p>
                </div>
              ))
            ) : (
              <div className='text-center text-sm text-gray-500'>
                No results found
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
