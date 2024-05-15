'use client';
import { TagType } from '@/lib';
import { getBlogById } from '@/services/blogService';
import React, { useEffect, useState } from 'react';

interface BlogViewProps {
  blogId: string;
}

const BlogView: React.FC<BlogViewProps> = ({ blogId }) => {
  const [blog, setBlog] = useState<any | null>(null);

  const getBlogData = async (blogId: string) => {
    const result = await getBlogById(blogId);
    setBlog(result.data);
  };

  useEffect(() => {
    if (typeof blogId === 'string') {
      getBlogData(blogId);
    }
  }, [blogId]);

  return (
    <div className='flex flex-col justify-left px-4 sm:px-6 md:px-12 lg:px-24 xl:px-96 2xl:px-96'>
      <div>
        <h1 className='font-semi-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-4 sm:my-6 md:my-8'>
          {blog?.title}
        </h1>
        <div className='my-10 flex flex-row justify-start items-center'>
          {blog?.tags.map((tag: TagType) => {
            return (
              <div
                key={tag._id}
                className='px-4 py-2 border mx-2 rounded-full shadow-sm bg-lime-400 dark:bg-white dark:text-white cursor-pointer'
              >
                <p>{tag.name}</p>
              </div>
            );
          })}
        </div>
        <p
          className='font-light text-base sm:text-lg md:text-xl'
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        ></p>
      </div>
    </div>
  );
};

export default BlogView;
